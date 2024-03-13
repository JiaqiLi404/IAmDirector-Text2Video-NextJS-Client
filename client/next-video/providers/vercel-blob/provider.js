import { ReadStream, createReadStream } from "node:fs";
import fs from "node:fs/promises";
import { fetch as uFetch } from "undici";
import { put } from "@vercel/blob";
import chalk from "chalk";
import { updateAsset } from "../../assets.js";
import { createAssetKey } from "../../utils/provider.js";
import { isRemote } from "../../utils/utils.js";
import log from "../../utils/logger.js";
const config = {
  runtime: "edge"
};
async function uploadLocalFile(asset) {
  const filePath = asset.originalFilePath;
  if (!filePath) {
    log.error("No filePath provided for asset.");
    console.error(asset);
    return;
  }
  if (isRemote(filePath)) {
    return uploadRequestedFile(asset);
  }
  if (asset.status === "ready") {
    return;
  } else if (asset.status === "uploading") {
    log.info(log.label("Resuming upload:"), filePath);
  }
  await updateAsset(filePath, {
    status: "uploading"
  });
  const fileStats = await fs.stat(filePath);
  const stream = createReadStream(filePath);
  return putAsset(filePath, fileStats.size, stream);
}
async function uploadRequestedFile(asset) {
  const filePath = asset.originalFilePath;
  if (!filePath) {
    log.error("No URL provided for asset.");
    console.error(asset);
    return;
  }
  if (asset.status === "ready") {
    return;
  }
  await updateAsset(filePath, {
    status: "uploading"
  });
  const response = await uFetch(filePath);
  const size = Number(response.headers.get("content-length"));
  const stream = response.body;
  if (!stream) {
    log.error("Error fetching the requested file:", filePath);
    return;
  }
  return putAsset(filePath, size, stream);
}
async function putAsset(filePath, size, stream) {
  log.info(log.label("Uploading file:"), `${filePath} (${size} bytes)`);
  let key;
  let blob;
  try {
    key = await createAssetKey(filePath, "vercel-blob");
    blob = await put(key, stream, { access: "public" });
    if (stream instanceof ReadStream) {
      stream.close();
    }
  } catch (e) {
    log.error("Error uploading to Vercel Blob");
    console.error(e);
    return;
  }
  log.success(log.label("File uploaded:"), `${filePath} (${size} bytes)`);
  log.space(chalk.gray(">"), log.label("URL:"), blob.url);
  const updatedAsset = await updateAsset(filePath, {
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
  log.space(chalk.gray(">"), log.label("URL:"), url);
  return updatedAsset;
}
export {
  config,
  uploadLocalFile,
  uploadRequestedFile
};
