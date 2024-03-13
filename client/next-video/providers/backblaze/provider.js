import { ReadStream, createReadStream } from "node:fs";
import { Readable } from "node:stream";
import fs from "node:fs/promises";
import { env } from "node:process";
import { fetch as uFetch } from "undici";
import chalk from "chalk";
import cuid2 from "@paralleldrive/cuid2";
import { S3Client } from "@aws-sdk/client-s3";
import { updateAsset } from "../../assets.js";
import { getVideoConfig } from "../../config.js";
import { findBucket, createBucket, putBucketCors, putObject } from "../../utils/s3.js";
import { createAssetKey } from "../../utils/provider.js";
import { isRemote } from "../../utils/utils.js";
import log from "../../utils/logger.js";
const createId = cuid2.init({ length: 11 });
let s3;
let bucketName;
let endpoint;
async function initS3() {
  const { providerConfig } = await getVideoConfig();
  const backblazeConfig = providerConfig.backblaze;
  bucketName = backblazeConfig?.bucket ?? "";
  endpoint = backblazeConfig?.endpoint ?? "";
  const regionMatch = endpoint.match(/\.([a-z0-9-]+)\.backblazeb2\.com$/);
  const region = regionMatch ? regionMatch[1] : "";
  s3 ?? (s3 = new S3Client({
    endpoint,
    region,
    credentials: {
      accessKeyId: backblazeConfig?.accessKeyId ?? env.BACKBLAZE_ACCESS_KEY_ID ?? "",
      secretAccessKey: backblazeConfig?.secretAccessKey ?? env.BACKBLAZE_SECRET_ACCESS_KEY ?? ""
    }
  }));
  if (!bucketName) {
    try {
      const bucket = await findBucket(s3, (bucket2) => bucket2.Name?.startsWith("next-videos-"));
      if (bucket) {
        bucketName = bucket.Name;
        log.info(log.label("Using existing Backblaze bucket:"), bucketName);
      }
    } catch (err) {
      log.error("Error listing Backblaze buckets");
      console.error(err);
    }
  }
  if (!bucketName) {
    bucketName = `next-videos-${createId()}`;
    log.info(log.label("Creating Backblaze bucket:"), bucketName);
    try {
      await createBucket(s3, bucketName, {
        ACL: "public-read"
      });
      await putBucketCors(s3, bucketName);
    } catch (err) {
      log.error("Error creating Backblaze bucket");
      console.error(err);
    }
  }
}
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
  await initS3();
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
  await initS3();
  const response = await uFetch(filePath);
  const size = Number(response.headers.get("content-length"));
  const stream = response.body;
  if (!stream) {
    log.error("Error fetching the requested file:", filePath);
    return;
  }
  return putAsset(filePath, size, Readable.fromWeb(stream));
}
async function putAsset(filePath, size, stream) {
  log.info(log.label("Uploading file:"), `${filePath} (${size} bytes)`);
  let key;
  try {
    key = await createAssetKey(filePath, "backblaze");
    await putObject(s3, {
      Bucket: bucketName,
      Key: key,
      Body: stream,
      ContentLength: size
    });
    if (stream instanceof ReadStream) {
      stream.close();
    }
  } catch (e) {
    log.error("Error uploading to Backblaze B2");
    console.error(e);
    return;
  }
  log.success(log.label("File uploaded:"), `${filePath} (${size} bytes)`);
  const updatedAsset = await updateAsset(filePath, {
    status: "ready",
    providerMetadata: {
      backblaze: {
        endpoint,
        bucket: bucketName,
        key
      }
    }
  });
  const url = updatedAsset.sources?.[0].src;
  log.space(chalk.gray(">"), log.label("URL:"), url);
  return updatedAsset;
}
export {
  uploadLocalFile,
  uploadRequestedFile
};
