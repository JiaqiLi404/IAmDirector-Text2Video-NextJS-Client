import { Asset } from '../../assets.js';
export declare const config: {
    runtime: string;
};
export type VercelBlobMetadata = {
    url?: string;
    contentType?: string;
};
export declare function uploadLocalFile(asset: Asset): Promise<Asset | undefined>;
export declare function uploadRequestedFile(asset: Asset): Promise<Asset | undefined>;
