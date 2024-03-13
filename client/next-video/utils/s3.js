import {
  PutBucketCorsCommand,
  CreateBucketCommand,
  PutObjectCommand,
  ListBucketsCommand,
  DeletePublicAccessBlockCommand,
  PutBucketAclCommand
} from "@aws-sdk/client-s3";
async function findBucket(s3, callbackFn) {
  const { Buckets } = await s3.send(new ListBucketsCommand({}));
  return Buckets?.find(callbackFn);
}
function createBucket(s3, bucketName, input) {
  return s3.send(new CreateBucketCommand({
    Bucket: bucketName,
    ...input
  }));
}
async function putBucketAcl(s3, bucketName, input) {
  await s3.send(new DeletePublicAccessBlockCommand({
    Bucket: bucketName
  }));
  return s3.send(new PutBucketAclCommand({
    Bucket: bucketName,
    ACL: input?.ACL ?? "public-read",
    ...input
  }));
}
function putObject(s3, input) {
  return s3.send(new PutObjectCommand(input));
}
function putBucketCors(s3, bucketName) {
  return s3.send(new PutBucketCorsCommand({
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
export {
  createBucket,
  findBucket,
  putBucketAcl,
  putBucketCors,
  putObject
};
