import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import chalk from "chalk";
import Mux from "@mux/mux-node";
import { fetch as uFetch } from "undici";
import { updateAsset } from "../../assets.js";
import log from "../../utils/logger.js";
import { sleep } from "../../utils/utils.js";
let mux;
function initMux() {
  mux ?? (mux = new Mux());
}
async function pollForAssetReady(filePath, asset) {
  const providerMetadata = asset.providerMetadata?.mux;
  if (!providerMetadata?.assetId) {
    log.error("No assetId provided for asset.");
    console.error(asset);
    return;
  }
  initMux();
  const assetId = providerMetadata?.assetId;
  const muxAsset = await mux.video.assets.retrieve(assetId);
  const playbackId = muxAsset.playback_ids?.[0].id;
  let updatedAsset = asset;
  if (providerMetadata?.playbackId !== playbackId) {
    updatedAsset = await updateAsset(filePath, {
      providerMetadata: {
        mux: {
          playbackId
        }
      }
    });
  }
  if (muxAsset.status === "errored") {
    log.error(log.label("Asset errored:"), filePath);
    log.space(chalk.gray(">"), log.label("Mux Asset ID:"), assetId);
    return updateAsset(filePath, {
      status: "error",
      error: muxAsset.errors
    });
  }
  if (muxAsset.status === "ready") {
    let blurDataURL;
    try {
      blurDataURL = await createThumbHash(`https://image.mux.com/${playbackId}/thumbnail.webp?width=16&height=16`);
    } catch (e) {
      log.error("Error creating a thumbnail hash.");
    }
    log.success(log.label("Asset is ready:"), filePath);
    log.space(chalk.gray(">"), log.label("Playback ID:"), playbackId);
    return updateAsset(filePath, {
      status: "ready",
      blurDataURL,
      providerMetadata: {
        mux: {
          playbackId
        }
      }
    });
  } else {
    await sleep(1e3);
    return pollForAssetReady(filePath, updatedAsset);
  }
}
async function pollForUploadAsset(filePath, asset) {
  const providerMetadata = asset.providerMetadata?.mux;
  if (!providerMetadata?.uploadId) {
    log.error("No uploadId provided for asset.");
    console.error(asset);
    return;
  }
  initMux();
  const uploadId = providerMetadata?.uploadId;
  const muxUpload = await mux.video.uploads.retrieve(uploadId);
  if (muxUpload.asset_id) {
    log.info(log.label("Asset is processing:"), filePath);
    log.space(chalk.gray(">"), log.label("Mux Asset ID:"), muxUpload.asset_id);
    const processingAsset = await updateAsset(filePath, {
      status: "processing",
      providerMetadata: {
        mux: {
          assetId: muxUpload.asset_id
        }
      }
    });
    return pollForAssetReady(filePath, processingAsset);
  } else {
    await sleep(1e3);
    return pollForUploadAsset(filePath, asset);
  }
}
async function uploadLocalFile(asset) {
  const filePath = asset.originalFilePath;
  if (!filePath) {
    log.error("No filePath provided for asset.");
    console.error(asset);
    return;
  }
  initMux();
  if (asset.status === "ready") {
    return;
  } else if (asset.status === "processing") {
    log.info(log.label("Asset is already processing. Polling for completion:"), filePath);
    return pollForAssetReady(filePath, asset);
  } else if (asset.status === "uploading") {
    log.info(log.label("Resuming upload:"), filePath);
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
    log.error("Error creating a Mux Direct Upload");
    console.error(e);
    return;
  }
  await updateAsset(filePath, {
    status: "uploading",
    providerMetadata: {
      mux: {
        uploadId: upload.id
        // more typecasting while we use the beta mux sdk
      }
    }
  });
  const fileStats = await fs.stat(filePath);
  const stream = createReadStream(filePath);
  log.info(log.label("Uploading file:"), `${filePath} (${fileStats.size} bytes)`);
  try {
    await uFetch(upload.url, {
      method: "PUT",
      // @ts-ignore
      body: stream,
      duplex: "half"
    });
    stream.close();
  } catch (e) {
    log.error("Error uploading to the Mux upload URL");
    console.error(e);
    return;
  }
  log.success(log.label("File uploaded:"), `${filePath} (${fileStats.size} bytes)`);
  const processingAsset = await updateAsset(filePath, {
    status: "processing"
  });
  return pollForUploadAsset(filePath, processingAsset);
}
async function uploadRequestedFile(asset) {
  const filePath = asset.originalFilePath;
  if (!filePath) {
    log.error("No URL provided for asset.");
    console.error(asset);
    return;
  }
  initMux();
  if (asset.status === "ready") {
    return;
  } else if (asset.status === "processing") {
    log.info(log.label("Asset is already processing. Polling for completion:"), filePath);
    return pollForAssetReady(filePath, asset);
  }
  const assetObj = await mux.video.assets.create({
    // @ts-ignore
    input: [{
      url: filePath
    }],
    playback_policy: ["public"]
  });
  log.info(log.label("Asset is processing:"), filePath);
  log.space(chalk.gray(">"), log.label("Mux Asset ID:"), assetObj.id);
  const processingAsset = await updateAsset(filePath, {
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
  const response = await uFetch(imgUrl);
  const buffer = await response.arrayBuffer();
  const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  return `data:image/webp;base64,${base64String}`;
}
export {
  createThumbHash,
  uploadLocalFile,
  uploadRequestedFile
};
