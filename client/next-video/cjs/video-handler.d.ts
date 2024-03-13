type VideoHandlerCallback = (event: any, ...args: any[]) => Promise<any>;
interface Handlers {
    [key: string]: VideoHandlerCallback;
}
export interface HandlerConfig {
    timeout?: number;
    [key: string]: any;
}
export declare const HANDLERS: Handlers;
export declare function callHandler(event: string, data: any, config?: HandlerConfig): Promise<any>;
export declare function videoHandler(event: string, callback: VideoHandlerCallback): (event: any) => Promise<any>;
export {};
