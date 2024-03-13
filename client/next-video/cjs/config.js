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
var config_exports = {};
__export(config_exports, {
  getVideoConfig: () => getVideoConfig,
  videoConfigDefault: () => videoConfigDefault
});
module.exports = __toCommonJS(config_exports);
var import_node_process = require("node:process");
var import_node_path = __toESM(require("node:path"), 1);
var import_node_url = require("node:url");
const videoConfigDefault = {
  folder: "videos",
  path: "/api/video",
  provider: "mux",
  providerConfig: {}
};
async function getVideoConfig() {
  let nextConfig;
  try {
    nextConfig = await importConfig("next.config.js");
  } catch (err) {
    try {
      nextConfig = await importConfig("next.config.mjs");
    } catch {
      console.error("Failed to load next.config.js or next.config.mjs");
    }
  }
  return nextConfig?.serverRuntimeConfig?.nextVideo;
}
async function importConfig(file) {
  const absFilePath = import_node_path.default.resolve((0, import_node_process.cwd)(), file);
  const fileUrl = (0, import_node_url.pathToFileURL)(absFilePath).href;
  return (await import(
    /* webpackIgnore: true */
    fileUrl
  ))?.default;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getVideoConfig,
  videoConfigDefault
});
