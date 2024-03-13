import symlinkDir from "symlink-dir";
import { join, dirname } from "node:path";
import fs from "node:fs/promises";
import { env } from "node:process";
import { fileURLToPath } from "node:url";
import { videoConfigDefault } from "./config.js";
async function withNextVideo(nextConfig, videoConfig) {
  if (typeof nextConfig === "function") {
    return async (...args) => {
      const nextConfigResult = await Promise.resolve(nextConfig(...args));
      return withNextVideo(nextConfigResult, videoConfig);
    };
  }
  const videoConfigComplete = Object.assign({}, videoConfigDefault, videoConfig);
  const { path, folder, provider } = videoConfigComplete;
  env["NEXT_PUBLIC_VIDEO_OPTS"] = JSON.stringify({ path, provider });
  env["__NEXT_VIDEO_OPTS"] = JSON.stringify(videoConfigComplete);
  if (process.argv[2] === "dev") {
    env["NEXT_PUBLIC_DEV_VIDEO_OPTS"] = JSON.stringify({ path, folder, provider });
    const VIDEOS_PATH = join(process.cwd(), folder);
    const TMP_PUBLIC_VIDEOS_PATH = join(process.cwd(), "public", `_next-video`);
    await symlinkDir(VIDEOS_PATH, TMP_PUBLIC_VIDEOS_PATH);
    process.on("exit", async () => {
      await fs.unlink(TMP_PUBLIC_VIDEOS_PATH);
    });
  }
  return Object.assign({}, nextConfig, {
    serverRuntimeConfig: {
      ...nextConfig.serverRuntimeConfig,
      nextVideo: videoConfigComplete
    },
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }
      if (Array.isArray(config.externals)) {
        config.externals.unshift({
          sharp: "commonjs sharp"
        });
      } else {
        config.externals = Object.assign({}, {
          sharp: "commonjs sharp"
        }, config.externals);
      }
      config.infrastructureLogging = {
        ...config.infrastructureLogging,
        // Silence warning about dynamic import of next.config file.
        // > [webpack.cache.PackFileCacheStrategy/webpack.FileSystemInfo] Parsing of /next-video/dist/config.js for build dependencies failed at 'import(fileUrl.
        // > Build dependencies behind this expression are ignored and might cause incorrect cache invalidation.
        level: "error"
      };
      config.experiments.buildHttp = {
        allowedUris: [
          /https?:\/\/.*\.(mp4|webm|mkv|ogg|ogv|wmv|avi|mov|flv|m4v|3gp)\??(?:&?[^=&]*=[^=&]*)*$/,
          ...config.experiments.buildHttp?.allowedUris ?? []
        ],
        ...config.experiments.buildHttp || {},
        // Disable cache to prevent Webpack from downloading the remote sources.
        cacheLocation: false
      };
      const scriptDir = typeof __dirname === "string" ? __dirname : dirname(fileURLToPath(import.meta.url));
      config.module.rules.push({
        test: /\.(mp4|webm|mkv|ogg|ogv|wmv|avi|mov|flv|m4v|3gp)\??(?:&?[^=&]*=[^=&]*)*$/,
        use: [
          {
            loader: join(scriptDir, "webpack-loader.js")
            // options: {
            //   publicPath: `${prefix || basePath}/_next/static/videos/`,
            //   outputPath: `${isServer ? '../' : ''}static/videos/`,
            //   name: '[name]-[hash].[ext]',
            // },
          }
        ]
      });
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  });
}
export {
  withNextVideo
};
