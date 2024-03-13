export declare function sleep(ms: number): Promise<unknown>;
export declare function camelCase(name: string): string;
export declare function isRemote(filePath: string): boolean;
export declare function toSafePath(str: string): string;
/**
* Performs a deep merge of objects and returns a new object.
* Does not modify objects (immutable) and merges arrays via concatenation.
*/
export declare function deepMerge(...objects: any[]): any;
export declare function isObject(item: any): any;
