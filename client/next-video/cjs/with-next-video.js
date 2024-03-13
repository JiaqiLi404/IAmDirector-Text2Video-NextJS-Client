"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var with_next_video_exports = {};
__export(with_next_video_exports, {
  withNextVideo: () => withNextVideo
});
module.exports = __toCommonJS(with_next_video_exports);
var import_symlink_dir = __toESM(require("symlink-dir"), 1);
var import_node_path = require("node:path");
var import_promises = __toESM(require("node:fs/promises"), 1);
var import_node_process = require("node:process");
var import_node_url = require("node:url");
var import_config = require("./config.js");
async function withNextVideo(nextConfig, videoConfig) {
  if (typeof nextConfig === "function") {
    return async (...args) => {
      const nextConfigResult = await Promise.resolve(nextConfig(...args));
      return withNextVideo(nextConfigResult, videoConfig);
    };
  }
  const videoConfigComplete = Object.assign({}, import_config.videoConfigDefault, videoConfig);
  const { path, folder, provider } = videoConfigComplete;
  import_node_process.env["NEXT_PUBLIC_VIDEO_OPTS"] = JSON.stringify({ path, provider });
  import_node_process.env["__NEXT_VIDEO_OPTS"] = JSON.stringify(videoConfigComplete);
  if (process.argv[2] === "dev") {
    import_node_process.env["NEXT_PUBLIC_DEV_VIDEO_OPTS"] = JSON.stringify({ path, folder, provider });
    const VIDEOS_PATH = (0, import_node_path.join)(process.cwd(), folder);
    const TMP_PUBLIC_VIDEOS_PATH = (0, import_node_path.join)(process.cwd(), "public", `_next-video`);
    await (0, import_symlink_dir.default)(VIDEOS_PATH, TMP_PUBLIC_VIDEOS_PATH);
    process.on("exit", async () => {
      await import_promises.default.unlink(TMP_PUBLIC_VIDEOS_PATH);
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
      const scriptDir = typeof __dirname === "string" ? __dirname : (0, import_node_path.dirname)((0, import_node_url.fileURLToPath)(""));
      config.module.rules.push({
        test: /\.(mp4|webm|mkv|ogg|ogv|wmv|avi|mov|flv|m4v|3gp)\??(?:&?[^=&]*=[^=&]*)*$/,
        use: [
          {
            loader: (0, import_node_path.join)(scriptDir, "webpack-loader.js")
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  withNextVideo
});
