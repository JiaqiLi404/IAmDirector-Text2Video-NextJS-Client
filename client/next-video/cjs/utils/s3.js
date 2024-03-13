"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var s3_exports = {};
__export(s3_exports, {
  createBucket: () => createBucket,
  findBucket: () => findBucket,
  putBucketAcl: () => putBucketAcl,
  putBucketCors: () => putBucketCors,
  putObject: () => putObject
});
module.exports = __toCommonJS(s3_exports);
var import_client_s3 = require("@aws-sdk/client-s3");
async function findBucket(s3, callbackFn) {
  const { Buckets } = await s3.send(new import_client_s3.ListBucketsCommand({}));
  return Buckets?.find(callbackFn);
}
function createBucket(s3, bucketName, input) {
  return s3.send(new import_client_s3.CreateBucketCommand({
    Bucket: bucketName,
    ...input
  }));
}
async function putBucketAcl(s3, bucketName, input) {
  await s3.send(new import_client_s3.DeletePublicAccessBlockCommand({
    Bucket: bucketName
  }));
  return s3.send(new import_client_s3.PutBucketAclCommand({
    Bucket: bucketName,
    ACL: input?.ACL ?? "public-read",
    ...input
  }));
}
function putObject(s3, input) {
  return s3.send(new import_client_s3.PutObjectCommand(input));
}
function putBucketCors(s3, bucketName) {
  return s3.send(new import_client_s3.PutBucketCorsCommand({
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules: [
        {
          // Allow all headers to be sent to this bucket.
          AllowedHeaders: ["*"],
          // Allow only GET and PUT methods to be sent to this bucket.
          AllowedMethods: ["GET", "PUT"],
          // Allow only requests from the specified origin.
          AllowedOrigins: ["*"],
          // Allow the entity tag (ETag) header to be returned in the response. The ETag header
          // The entity tag represents a specific version of the object. The ETag reflects
          // changes only to the contents of an object, not its metadata.
          ExposeHeaders: ["ETag"],
          // How long the requesting browser should cache the preflight response. After
          // this time, the preflight request will have to be made again.
          MaxAgeSeconds: 3600
        }
      ]
    }
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createBucket,
  findBucket,
  putBucketAcl,
  putBucketCors,
  putObject
});
