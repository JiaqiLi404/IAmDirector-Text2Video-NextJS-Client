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
var webpack_loader_exports = {};
__export(webpack_loader_exports, {
  default: () => loader,
  raw: () => raw
});
module.exports = __toCommonJS(webpack_loader_exports);
var import_node_path = __toESM(require("node:path"), 1);
var import_promises = require("node:fs/promises");
var import_assets = require("./assets.js");
const raw = true;
async function loader(source) {
  const importPath = `${this.resourcePath}${this.resourceQuery ?? ""}`;
  const assetPath = import_node_path.default.resolve(await (0, import_assets.getAssetConfigPath)(importPath));
  this.addDependency(assetPath);
  let asset;
  try {
    asset = await (0, import_promises.readFile)(assetPath, "utf-8");
  } catch {
    asset = JSON.stringify(await (0, import_assets.createAsset)(importPath, {
      status: "sourced"
    }));
  }
  return `export default ${asset}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  raw
});
