import type { Asset } from '../../assets.js';
type Props = {
    customDomain?: string;
    thumbnailTime?: number;
    startTime?: number;
    tokens?: {
        thumbnail?: string;
    };
};
type PosterProps = {
    customDomain?: string;
    thumbnailTime?: number;
    token?: string;
    width?: number;
};
export declare function transform(asset: Asset, props?: Props): Asset;
export declare function getPlaybackId(asset: Asset): string | undefined;
export declare const getPosterURLFromPlaybackId: (playbackId?: string, { token, thumbnailTime, width, customDomain }?: PosterProps) => string | undefined;
export {};
