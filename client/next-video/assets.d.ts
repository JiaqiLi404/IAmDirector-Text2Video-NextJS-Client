export interface Asset {
    status: 'sourced' | 'pending' | 'uploading' | 'processing' | 'ready' | 'error';
    originalFilePath: string;
    provider: string;
    providerMetadata?: {
        [provider: string]: {
            [key: string]: any;
        };
    };
    poster?: string;
    sources?: AssetSource[];
    blurDataURL?: string;
    size?: number;
    error?: any;
    createdAt: number;
    updatedAt: number;
    externalIds?: {
        [key: string]: string;
    };
}
export interface AssetSource {
    src: string;
    type?: string;
}
export declare function getAsset(filePath: string): Promise<Asset | undefined>;
export declare function getAssetConfigPath(filePath: string): Promise<string>;
export declare function createAsset(filePath: string, assetDetails?: Partial<Asset>): Promise<Asset | undefined>;
export declare function updateAsset(filePath: string, assetDetails: Partial<Asset>): Promise<Asset>;
