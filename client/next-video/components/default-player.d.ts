/// <reference types="react" />
import type { MuxPlayerProps, MuxPlayerRefAttributes } from '@mux/mux-player-react';
import type { PlayerProps } from './types.js';
export type DefaultPlayerRefAttributes = MuxPlayerRefAttributes;
export type DefaultPlayerProps = Omit<MuxPlayerProps, 'src'> & PlayerProps;
export declare const DefaultPlayer: import("react").ForwardRefExoticComponent<Omit<MuxPlayerProps, "src"> & PlayerProps & import("react").RefAttributes<import("@mux/mux-player/.").default | null>>;
