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
var provider_exports = {};
__export(provider_exports, {
  createAssetKey: () => createAssetKey
});
module.exports = __toCommonJS(provider_exports);
var path = __toESM(require("node:path"), 1);
var import_config = require("../config.js");
var import_utils = require("./utils.js");
async function createAssetKey(filePathOrURL, provider) {
  const { folder, providerConfig } = await (0, import_config.getVideoConfig)();
  const config = providerConfig[provider];
  const { generateAssetKey = defaultGenerateAssetKey } = config ?? {};
  return generateAssetKey(filePathOrURL, folder);
}
function defaultGenerateAssetKey(filePathOrURL, folder) {
  if (!(0, import_utils.isRemote)(filePathOrURL))
    return filePathOrURL;
  const url = new URL(filePathOrURL);
  return path.posix.join(folder, path.basename(decodeURIComponent(url.pathname)));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAssetKey
});
