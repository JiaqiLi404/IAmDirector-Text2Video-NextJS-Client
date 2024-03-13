/// <reference types="react" />
export declare const config: any;
export declare function toSymlinkPath(path?: string): string | undefined;
export declare function camelCase(name: string): string;
export declare function getUrlExtension(url: string | unknown): string | undefined;
export declare function usePolling(callback: (abortSignal: AbortSignal) => any, interval?: number | null): void;
export declare function useInterval(callback: () => any, delay: number | null): void;
export declare function isReactComponent<TProps>(component: unknown): component is React.ComponentType<TProps>;
