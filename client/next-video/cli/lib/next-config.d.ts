import type { VideoConfig } from '../../config.js';
export default function updateNextConfigFile(parentDir?: string, videoConfig?: VideoConfig): Promise<{
    type: "commonjs";
    configPath: string;
} | {
    type: "module";
    configPath: string;
} | undefined>;
