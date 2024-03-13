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
var assets_exports = {};
__export(assets_exports, {
  createAsset: () => createAsset,
  getAsset: () => getAsset,
  getAssetConfigPath: () => getAssetConfigPath,
  updateAsset: () => updateAsset
});
module.exports = __toCommonJS(assets_exports);
var path = __toESM(require("node:path"), 1);
var import_node_process = require("node:process");
var import_promises = require("node:fs/promises");
var import_config = require("./config.js");
var import_utils = require("./utils/utils.js");
var transformers = __toESM(require("./providers/transformers.js"), 1);
async function getAsset(filePath) {
  const assetConfigPath = await getAssetConfigPath(filePath);
  const file = await (0, import_promises.readFile)(assetConfigPath);
  const asset = JSON.parse(file.toString());
  return asset;
}
async function getAssetConfigPath(filePath) {
  return `${await getAssetPath(filePath)}.json`;
}
async function getAssetPath(filePath) {
  if (!(0, import_utils.isRemote)(filePath))
    return filePath;
  const { folder, remoteSourceAssetPath = defaultRemoteSourceAssetPath } = await (0, import_config.getVideoConfig)();
  if (!folder)
    throw new Error("Missing video `folder` config.");
  return path.join(folder, remoteSourceAssetPath(filePath));
}
function defaultRemoteSourceAssetPath(url) {
  const urlObj = new URL(url);
  return (0, import_utils.toSafePath)(decodeURIComponent(`${urlObj.hostname}${urlObj.pathname}`));
}
async function createAsset(filePath, assetDetails) {
  const videoConfig = await (0, import_config.getVideoConfig)();
  const assetConfigPath = await getAssetConfigPath(filePath);
  let originalFilePath = filePath;
  if (!(0, import_utils.isRemote)(filePath)) {
    originalFilePath = path.relative((0, import_node_process.cwd)(), filePath);
  }
  const newAssetDetails = {
    status: "pending",
    // overwritable
    ...assetDetails,
    originalFilePath,
    provider: videoConfig.provider,
    providerMetadata: {},
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  if (!(0, import_utils.isRemote)(filePath)) {
    try {
      newAssetDetails.size = (await (0, import_promises.stat)(filePath))?.size;
    } catch {
    }
  }
  try {
    await (0, import_promises.mkdir)(path.dirname(assetConfigPath), { recursive: true });
    await (0, import_promises.writeFile)(assetConfigPath, JSON.stringify(newAssetDetails), {
      flag: "wx"
    });
  } catch (err) {
    if (err.code === "EEXIST") {
      return;
    }
    throw err;
  }
  return newAssetDetails;
}
async function updateAsset(filePath, assetDetails) {
  const assetConfigPath = await getAssetConfigPath(filePath);
  const currentAsset = await getAsset(filePath);
  if (!currentAsset) {
    throw new Error(`Asset not found: ${filePath}`);
  }
  let newAssetDetails = (0, import_utils.deepMerge)(currentAsset, assetDetails, {
    updatedAt: Date.now()
  });
  newAssetDetails = transformAsset(transformers, newAssetDetails);
  await (0, import_promises.writeFile)(assetConfigPath, JSON.stringify(newAssetDetails));
  return newAssetDetails;
}
function transformAsset(transformers2, asset) {
  const provider = asset.provider;
  if (!provider)
    return asset;
  for (let [key, transformer] of Object.entries(transformers2)) {
    if (key === (0, import_utils.camelCase)(provider)) {
      return transformer.transform(asset);
    }
  }
  return asset;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsset,
  getAsset,
  getAssetConfigPath,
  updateAsset
});
