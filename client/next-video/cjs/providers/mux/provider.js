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
  createThumbHash: () => createThumbHash,
  uploadLocalFile: () => uploadLocalFile,
  uploadRequestedFile: () => uploadRequestedFile
});
module.exports = __toCommonJS(provider_exports);
var import_node_fs = require("node:fs");
var import_promises = __toESM(require("node:fs/promises"), 1);
var import_chalk = __toESM(require("chalk"), 1);
var import_mux_node = __toESM(require("@mux/mux-node"), 1);
var import_undici = require("undici");
var import_assets = require("../../assets.js");
var import_logger = __toESM(require("../../utils/logger.js"), 1);
var import_utils = require("../../utils/utils.js");
let mux;
function initMux() {
  mux ?? (mux = new import_mux_node.default());
}
async function pollForAssetReady(filePath, asset) {
  const providerMetadata = asset.providerMetadata?.mux;
  if (!providerMetadata?.assetId) {
    import_logger.default.error("No assetId provided for asset.");
    console.error(asset);
    return;
  }
  initMux();
  const assetId = providerMetadata?.assetId;
  const muxAsset = await mux.video.assets.retrieve(assetId);
  const playbackId = muxAsset.playback_ids?.[0].id;
  let updatedAsset = asset;
  if (providerMetadata?.playbackId !== playbackId) {
    updatedAsset = await (0, import_assets.updateAsset)(filePath, {
      providerMetadata: {
        mux: {
          playbackId
        }
      }
    });
  }
  if (muxAsset.status === "errored") {
    import_logger.default.error(import_logger.default.label("Asset errored:"), filePath);
    import_logger.default.space(import_chalk.default.gray(">"), import_logger.default.label("Mux Asset ID:"), assetId);
    return (0, import_assets.updateAsset)(filePath, {
      status: "error",
      error: muxAsset.errors
    });
  }
  if (muxAsset.status === "ready") {
    let blurDataURL;
    try {
      blurDataURL = await createThumbHash(`https://image.mux.com/${playbackId}/thumbnail.webp?width=16&height=16`);
    } catch (e) {
      import_logger.default.error("Error creating a thumbnail hash.");
    }
    import_logger.default.success(import_logger.default.label("Asset is ready:"), filePath);
    import_logger.default.space(import_chalk.default.gray(">"), import_logger.default.label("Playback ID:"), playbackId);
    return (0, import_assets.updateAsset)(filePath, {
      status: "ready",
      blurDataURL,
      providerMetadata: {
        mux: {
          playbackId
        }
      }
    });
  } else {
    await (0, import_utils.sleep)(1e3);
    return pollForAssetReady(filePath, updatedAsset);
  }
}
async function pollForUploadAsset(filePath, asset) {
  const providerMetadata = asset.providerMetadata?.mux;
  if (!providerMetadata?.uploadId) {
    import_logger.default.error("No uploadId provided for asset.");
    console.error(asset);
    return;
  }
  initMux();
  const uploadId = providerMetadata?.uploadId;
  const muxUpload = await mux.video.uploads.retrieve(uploadId);
  if (muxUpload.asset_id) {
    import_logger.default.info(import_logger.default.label("Asset is processing:"), filePath);
    import_logger.default.space(import_chalk.default.gray(">"), import_logger.default.label("Mux Asset ID:"), muxUpload.asset_id);
    const processingAsset = await (0, import_assets.updateAsset)(filePath, {
      status: "processing",
      providerMetadata: {
        mux: {
          assetId: muxUpload.asset_id
        }
      }
    });
    return pollForAssetReady(filePath, processingAsset);
  } else {
    await (0, import_utils.sleep)(1e3);
    return pollForUploadAsset(filePath, asset);
  }
}
async function uploadLocalFile(asset) {
  const filePath = asset.originalFilePath;
  if (!filePath) {
    import_logger.default.error("No filePath provided for asset.");
    console.error(asset);
    return;
  }
  initMux();
  if (asset.status === "ready") {
    return;
  } else if (asset.status === "processing") {
    import_logger.default.info(import_logger.default.label("Asset is already processing. Polling for completion:"), filePath);
    return pollForAssetReady(filePath, asset);
  } else if (asset.status === "uploading") {
    import_logger.default.info(import_logger.default.label("Resuming upload:"), filePath);
  }
  if (filePath && /^https?:\/\//.test(filePath)) {
    return uploadRequestedFile(asset);
  }
  let upload;
  try {
    upload = await mux.video.uploads.create({
      cors_origin: "*",
      // @ts-ignore
      new_asset_settings: {
        playback_policy: ["public"]
      }
    });
  } catch (e) {
    import_logger.default.error("Error creating a Mux Direct Upload");
    console.error(e);
    return;
  }
  await (0, import_assets.updateAsset)(filePath, {
    status: "uploading",
    providerMetadata: {
      mux: {
        uploadId: upload.id
        // more typecasting while we use the beta mux sdk
      }
    }
  });
  const fileStats = await import_promises.default.stat(filePath);
  const stream = (0, import_node_fs.createReadStream)(filePath);
  import_logger.default.info(import_logger.default.label("Uploading file:"), `${filePath} (${fileStats.size} bytes)`);
  try {
    await (0, import_undici.fetch)(upload.url, {
      method: "PUT",
      // @ts-ignore
      body: stream,
      duplex: "half"
    });
    stream.close();
  } catch (e) {
    import_logger.default.error("Error uploading to the Mux upload URL");
    console.error(e);
    return;
  }
  import_logger.default.success(import_logger.default.label("File uploaded:"), `${filePath} (${fileStats.size} bytes)`);
  const processingAsset = await (0, import_assets.updateAsset)(filePath, {
    status: "processing"
  });
  return pollForUploadAsset(filePath, processingAsset);
}
async function uploadRequestedFile(asset) {
  const filePath = asset.originalFilePath;
  if (!filePath) {
    import_logger.default.error("No URL provided for asset.");
    console.error(asset);
    return;
  }
  initMux();
  if (asset.status === "ready") {
    return;
  } else if (asset.status === "processing") {
    import_logger.default.info(import_logger.default.label("Asset is already processing. Polling for completion:"), filePath);
    return pollForAssetReady(filePath, asset);
  }
  const assetObj = await mux.video.assets.create({
    // @ts-ignore
    input: [{
      url: filePath
    }],
    playback_policy: ["public"]
  });
  import_logger.default.info(import_logger.default.label("Asset is processing:"), filePath);
  import_logger.default.space(import_chalk.default.gray(">"), import_logger.default.label("Mux Asset ID:"), assetObj.id);
  const processingAsset = await (0, import_assets.updateAsset)(filePath, {
    status: "processing",
    providerMetadata: {
      mux: {
        assetId: assetObj.id
      }
    }
  });
  return pollForAssetReady(filePath, processingAsset);
}
async function createThumbHash(imgUrl) {
  const response = await (0, import_undici.fetch)(imgUrl);
  const buffer = await response.arrayBuffer();
  const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  return `data:image/webp;base64,${base64String}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createThumbHash,
  uploadLocalFile,
  uploadRequestedFile
});
