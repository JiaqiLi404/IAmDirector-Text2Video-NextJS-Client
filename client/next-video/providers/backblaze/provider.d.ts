import { Asset } from '../../assets.js';
export type BackblazeMetadata = {
    bucket?: string;
    endpoint?: string;
    key?: string;
};
export declare function uploadLocalFile(asset: Asset): Promise<Asset | undefined>;
export declare function uploadRequestedFile(asset: Asset): Promise<Asset | undefined>;
