import { Argv, Arguments } from 'yargs';
export declare const command = "sync";
export declare const desc = "Checks for new video files in the videos directory, uploads them, and checks any existing assets for updates.";
export declare function builder(yargs: Argv): Argv<import("yargs").Omit<{}, "dir" | "watch"> & import("yargs").InferredOptionTypes<{
    dir: {
        alias: string;
        describe: string;
        type: "string";
        default: string;
    };
    watch: {
        alias: string;
        describe: string;
        type: "boolean";
        default: boolean;
    };
}>>;
export declare function handler(argv: Arguments): Promise<void>;
