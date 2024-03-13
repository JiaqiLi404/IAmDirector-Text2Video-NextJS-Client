import type { Asset } from '../assets.js';
import type { HandlerConfig } from '../video-handler.js';
export declare function uploadLocalFile(asset: Asset, config: HandlerConfig): Promise<Asset | undefined>;
