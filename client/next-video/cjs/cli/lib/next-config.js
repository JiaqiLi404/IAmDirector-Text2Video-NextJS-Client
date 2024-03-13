"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var next_config_exports = {};
__export(next_config_exports, {
  default: () => updateNextConfigFile
});
module.exports = __toCommonJS(next_config_exports);
var import_magicast = require("magicast");
var import_promises = __toESM(require("node:fs/promises"), 1);
var import_node_path = __toESM(require("node:path"), 1);
var import_constants = require("../../constants.js");
var import_config = require("../../config.js");
function extensionToType(filePath) {
  if (filePath.endsWith(".mjs")) {
    return "module";
  }
  return "commonjs";
}
async function updateNextConfigFile(parentDir = "./", videoConfig) {
  let type = "commonjs";
  let configPath = void 0;
  let configContents = "";
  const pathsToCheck = ["next.config.js", "next.config.mjs"];
  for (let i = 0; i < pathsToCheck.length; i++) {
    const filePath = import_node_path.default.join(parentDir, pathsToCheck[i]);
    let exists;
    try {
      exists = await import_promises.default.stat(filePath);
    } catch (e) {
      exists = false;
    }
    if (exists) {
      type = extensionToType(pathsToCheck[i]);
      configPath = filePath;
      configContents = await import_promises.default.readFile(filePath, "utf-8");
      break;
    }
  }
  if (!configPath) {
    throw { error: "not_found" };
  }
  if (configContents.includes(import_constants.PACKAGE_NAME)) {
    throw { error: "already_added" };
  }
  if (type === "commonjs") {
    const mod = (0, import_magicast.parseModule)(configContents);
    const body = mod?.$ast?.body;
    let i = body.length ?? 0;
    while (i--) {
      const node = body[i];
      if (node.type === "ExpressionStatement" && node.expression.type === "AssignmentExpression") {
        const { left, right } = node.expression ?? {};
        if (left.type === "MemberExpression" && left.object.type === "Identifier" && left.object.name === "module") {
          if (left.property.type === "Identifier" && left.property.name === "exports") {
            if (right.type === "Identifier") {
              const expressionToWrap = (0, import_magicast.generateCode)(right).code;
              node.expression.right = wrapWithNextVideo(expressionToWrap, videoConfig).$ast;
            }
          }
        }
      }
    }
    let code = `const { withNextVideo } = require('${import_node_path.default.posix.join(import_constants.PACKAGE_NAME, "process")}')

${(0, import_magicast.generateCode)(mod).code}
`;
    await import_promises.default.writeFile(configPath, code);
    return { type, configPath };
  }
  if (type === "module") {
    const mod = await (0, import_magicast.loadFile)(configPath);
    mod.imports.$add({
      from: import_node_path.default.posix.join(import_constants.PACKAGE_NAME, "process"),
      imported: "withNextVideo",
      local: "withNextVideo"
    });
    const expressionToWrap = (0, import_magicast.generateCode)(mod.exports.default.$ast).code;
    mod.exports.default = wrapWithNextVideo(expressionToWrap, videoConfig);
    (0, import_magicast.writeFile)(mod, configPath);
    return { type, configPath };
  }
}
function wrapWithNextVideo(expressionToWrap, videoConfig) {
  if (videoConfig?.folder && videoConfig.folder !== import_config.videoConfigDefault.folder) {
    return import_magicast.builders.raw(`withNextVideo(${expressionToWrap}, { folder: '${videoConfig.folder}' })`);
  } else {
    return import_magicast.builders.raw(`withNextVideo(${expressionToWrap})`);
  }
}
