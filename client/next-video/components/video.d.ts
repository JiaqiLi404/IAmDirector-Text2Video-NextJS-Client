import React from 'react';
import type { DefaultPlayerProps } from './default-player.js';
import type { Asset } from '../assets.js';
import type { VideoLoaderProps, VideoProps, VideoPropsInternal } from './types.js';
declare const NextVideo: React.ForwardRefExoticComponent<VideoProps & React.RefAttributes<import("@mux/mux-player/.").default | null>>;
export declare function getVideoProps(allProps: VideoPropsInternal, state: {
    asset?: Asset;
}): DefaultPlayerProps;
export default NextVideo;
export type { VideoLoaderProps, VideoProps, DefaultPlayerProps, };
