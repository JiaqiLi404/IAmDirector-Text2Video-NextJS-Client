import { Asset } from '../../assets.js';
export type AmazonS3Metadata = {
    bucket?: string;
    endpoint?: string;
    key?: string;
};
export declare function uploadLocalFile(asset: Asset): Promise<Asset | undefined>;
export declare function uploadRequestedFile(asset: Asset): Promise<Asset | undefined>;
