/**
 * Video configurations
 */
export type VideoConfigComplete = {
    /** The folder in your project where you will put all video source files. */
    folder: string;
    /** The route of the video API request for string video source URLs. */
    path: string;
    provider: keyof ProviderConfig;
    providerConfig: ProviderConfig;
    remoteSourceAssetPath?: (url: string) => string;
};
export type ProviderConfig = {
    mux?: {
        generateAssetKey: undefined;
    };
    'vercel-blob'?: {
        generateAssetKey?: (filePathOrURL: string, folder: string) => string;
    };
    backblaze?: {
        endpoint: string;
        bucket?: string;
        accessKeyId?: string;
        secretAccessKey?: string;
        generateAssetKey?: (filePathOrURL: string, folder: string) => string;
    };
    'amazon-s3'?: {
        endpoint: string;
        bucket?: string;
        accessKeyId?: string;
        secretAccessKey?: string;
        generateAssetKey?: (filePathOrURL: string, folder: string) => string;
    };
};
export type VideoConfig = Partial<VideoConfigComplete>;
export declare const videoConfigDefault: VideoConfigComplete;
/**
 * The video config is set in `next.config.js` and passed to the `withNextVideo` function.
 * The video config is then stored as an environment variable __NEXT_VIDEO_OPTS.
 */
export declare function getVideoConfig(): Promise<VideoConfigComplete>;
