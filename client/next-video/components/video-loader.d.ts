import type { Asset } from '../assets.js';
import type { VideoLoaderProps, VideoLoaderPropsWithConfig, VideoLoaderWithConfig } from './types';
export declare function defaultLoader({ config, src, width, height }: VideoLoaderPropsWithConfig): Promise<string>;
export declare function createVideoRequest(loader: VideoLoaderWithConfig, props: VideoLoaderProps, callback: (json: Asset) => void): (abortSignal: AbortSignal) => Promise<void>;
