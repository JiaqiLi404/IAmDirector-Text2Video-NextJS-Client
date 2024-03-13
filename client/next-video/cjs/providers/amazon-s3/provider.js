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
  uploadLocalFile: () => uploadLocalFile,
  uploadRequestedFile: () => uploadRequestedFile
});
module.exports = __toCommonJS(provider_exports);
var import_node_fs = require("node:fs");
var import_node_stream = require("node:stream");
var import_promises = __toESM(require("node:fs/promises"), 1);
var import_node_process = require("node:process");
var import_undici = require("undici");
var import_chalk = __toESM(require("chalk"), 1);
var import_cuid2 = __toESM(require("@paralleldrive/cuid2"), 1);
var import_client_s3 = require("@aws-sdk/client-s3");
var import_assets = require("../../assets.js");
var import_config = require("../../config.js");
var import_s3 = require("../../utils/s3.js");
var import_provider = require("../../utils/provider.js");
var import_utils = require("../../utils/utils.js");
var import_logger = __toESM(require("../../utils/logger.js"), 1);
const createId = import_cuid2.default.init({ length: 11 });
let s3;
let bucketName;
let endpoint;
async function initS3() {
  const { providerConfig } = await (0, import_config.getVideoConfig)();
  const amazonS3Config = providerConfig["amazon-s3"];
  bucketName = amazonS3Config?.bucket ?? "";
  endpoint = amazonS3Config?.endpoint ?? "";
  const regionMatch = endpoint.match(/\.([a-z0-9-]+)\.amazonaws\.com$/);
  const region = regionMatch ? regionMatch[1] : "";
  s3 ?? (s3 = new import_client_s3.S3Client({
    endpoint,
    region,
    credentials: {
      accessKeyId: amazonS3Config?.accessKeyId ?? import_node_process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: amazonS3Config?.secretAccessKey ?? import_node_process.env.AWS_SECRET_ACCESS_KEY ?? ""
    }
  }));
  if (!bucketName) {
    try {
      const bucket = await (0, import_s3.findBucket)(s3, (bucket2) => bucket2.Name?.startsWith("next-videos-"));
      if (bucket) {
        bucketName = bucket.Name;
        import_logger.default.info(import_logger.default.label("Using existing Amazon S3 bucket:"), bucketName);
      }
    } catch (err) {
      import_logger.default.error("Error listing Amazon S3 buckets");
      console.error(err);
    }
  }
  if (!bucketName) {
    bucketName = `next-videos-${createId()}`;
    import_logger.default.info(import_logger.default.label("Creating Amazon S3 bucket:"), bucketName);
    try {
      await (0, import_s3.createBucket)(s3, bucketName, {
        // https://aws.amazon.com/blogs/aws/heads-up-amazon-s3-security-changes-are-coming-in-april-of-2023/
        // Can't set ACL here since the security changes, but we can set it after the bucket is created.
        // S3ServiceException [InvalidBucketAclWithBlockPublicAccessError]: Bucket cannot have public ACLs set with BlockPublicAccess enabled
        // ACL: 'public-read',
        // Since the security changes the default ObjectOwnership is BucketOwnerEnforced which doesn't allow ACLs. Change it here.
        // InvalidBucketAclWithObjectOwnership: Bucket cannot have ACLs set with ObjectOwnership's BucketOwnerEnforced setting
        ObjectOwnership: "ObjectWriter"
      });
      await (0, import_s3.putBucketAcl)(s3, bucketName);
      await (0, import_s3.putBucketCors)(s3, bucketName);
    } catch (err) {
      import_logger.default.error("Error creating Amazon S3 bucket");
      console.error(err);
    }
  }
}
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
  await initS3();
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
  await initS3();
  const response = await (0, import_undici.fetch)(filePath);
  const size = Number(response.headers.get("content-length"));
  const stream = response.body;
  if (!stream) {
    import_logger.default.error("Error fetching the requested file:", filePath);
    return;
  }
  return putAsset(filePath, size, import_node_stream.Readable.fromWeb(stream));
}
async function putAsset(filePath, size, stream) {
  import_logger.default.info(import_logger.default.label("Uploading file:"), `${filePath} (${size} bytes)`);
  let key;
  try {
    key = await (0, import_provider.createAssetKey)(filePath, "amazon-s3");
    await (0, import_s3.putObject)(s3, {
      ACL: "public-read",
      Bucket: bucketName,
      Key: key,
      Body: stream,
      ContentLength: size
    });
    if (stream instanceof import_node_fs.ReadStream) {
      stream.close();
    }
  } catch (e) {
    import_logger.default.error("Error uploading to Amazon S3");
    console.error(e);
    return;
  }
  import_logger.default.success(import_logger.default.label("File uploaded:"), `${filePath} (${size} bytes)`);
  const updatedAsset = await (0, import_assets.updateAsset)(filePath, {
    status: "ready",
    providerMetadata: {
      "amazon-s3": {
        endpoint,
        bucket: bucketName,
        key
      }
    }
  });
  const url = updatedAsset.sources?.[0].src;
  import_logger.default.space(import_chalk.default.gray(">"), import_logger.default.label("URL:"), url);
  return updatedAsset;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadLocalFile,
  uploadRequestedFile
});
