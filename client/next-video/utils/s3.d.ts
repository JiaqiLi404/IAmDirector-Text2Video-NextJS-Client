import { S3Client, CreateBucketCommand, PutObjectCommand, PutBucketAclCommand } from '@aws-sdk/client-s3';
export declare function findBucket(s3: S3Client, callbackFn: (bucket: {
    Name?: string;
}) => boolean | void): Promise<import("@aws-sdk/client-s3").Bucket | undefined>;
export declare function createBucket(s3: S3Client, bucketName: string, input?: Partial<CreateBucketCommand['input']>): Promise<import("@aws-sdk/client-s3").CreateBucketCommandOutput>;
export declare function putBucketAcl(s3: S3Client, bucketName: string, input?: Partial<PutBucketAclCommand['input']>): Promise<import("@aws-sdk/client-s3").PutBucketAclCommandOutput>;
export declare function putObject(s3: S3Client, input: PutObjectCommand['input']): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
export declare function putBucketCors(s3: S3Client, bucketName: string): Promise<import("@aws-sdk/client-s3").PutBucketCorsCommandOutput>;
