import type { ProviderConfig } from '../config.js';
export declare function createAssetKey(filePathOrURL: string, provider: keyof ProviderConfig): Promise<string>;
