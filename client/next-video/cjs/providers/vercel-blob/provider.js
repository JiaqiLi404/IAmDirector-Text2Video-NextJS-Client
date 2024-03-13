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
  config: () => config,
  uploadLocalFile: () => uploadLocalFile,
  uploadRequestedFile: () => uploadRequestedFile
});
module.exports = __toCommonJS(provider_exports);
var import_node_fs = require("node:fs");
var import_promises = __toESM(require("node:fs/promises"), 1);
var import_undici = require("undici");
var import_blob = require("@vercel/blob");
var import_chalk = __toESM(require("chalk"), 1);
var import_assets = require("../../assets.js");
var import_provider = require("../../utils/provider.js");
var import_utils = require("../../utils/utils.js");
var import_logger = __toESM(require("../../utils/logger.js"), 1);
const config = {
  runtime: "edge"
};
async function uploadLocalFile(asset) {
  const filePath = asset.originalFilePath;
  if (!filePath) {
    import_logger.default.error("No filePath provided for asset.");
    console.error(asset);
    return;
  }
  if ((0, import_utils.isRemote)(filePath)) {
    return uploadRequestedFile(asset);
  }
  if (asset.status === "ready") {
    return;
  } else if (asset.status === "uploading") {
    import_logger.default.info(import_logger.default.label("Resuming upload:"), filePath);
  }
  await (0, import_assets.updateAsset)(filePath, {
    status: "uploading"
  });
  const fileStats = await import_promises.default.stat(filePath);
  const stream = (0, import_node_fs.createReadStream)(filePath);
  return putAsset(filePath, fileStats.size, stream);
}
async function uploadRequestedFile(asset) {
  const filePath = asset.originalFilePath;
  if (!filePath) {
    import_logger.default.error("No URL provided for asset.");
    console.error(asset);
    return;
  }
  if (asset.status === "ready") {
    return;
  }
  await (0, import_assets.updateAsset)(filePath, {
    status: "uploading"
  });
  const response = await (0, import_undici.fetch)(filePath);
  const size = Number(response.headers.get("content-length"));
  const stream = response.body;
  if (!stream) {
    import_logger.default.error("Error fetching the requested file:", filePath);
    return;
  }
  return putAsset(filePath, size, stream);
}
async function putAsset(filePath, size, stream) {
  import_logger.default.info(import_logger.default.label("Uploading file:"), `${filePath} (${size} bytes)`);
  let key;
  let blob;
  try {
    key = await (0, import_provider.createAssetKey)(filePath, "vercel-blob");
    blob = await (0, import_blob.put)(key, stream, { access: "public" });
    if (stream instanceof import_node_fs.ReadStream) {
      stream.close();
    }
  } catch (e) {
    import_logger.default.error("Error uploading to Vercel Blob");
    console.error(e);
    return;
  }
  import_logger.default.success(import_logger.default.label("File uploaded:"), `${filePath} (${size} bytes)`);
  import_logger.default.space(import_chalk.default.gray(">"), import_logger.default.label("URL:"), blob.url);
  const updatedAsset = await (0, import_assets.updateAsset)(filePath, {
    status: "ready",
    providerMetadata: {
      "vercel-blob": {
        key,
        url: blob.url,
        contentType: blob.contentType
      }
    }
  });
  const url = updatedAsset.sources?.[0].src;
  import_logger.default.space(import_chalk.default.gray(">"), import_logger.default.label("URL:"), url);
  return updatedAsset;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  uploadLocalFile,
  uploadRequestedFile
});
