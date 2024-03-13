import { Asset } from '../../assets.js';
export type MuxMetadata = {
    uploadId?: string;
    assetId?: string;
    playbackId?: string;
};
export declare function uploadLocalFile(asset: Asset): Promise<Asset | undefined>;
export declare function uploadRequestedFile(asset: Asset): Promise<Asset | undefined>;
export declare function createThumbHash(imgUrl: string): Promise<string>;
