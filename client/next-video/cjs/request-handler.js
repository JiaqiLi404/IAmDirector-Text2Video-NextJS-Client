"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var request_handler_exports = {};
__export(request_handler_exports, {
  GET: () => GET,
  default: () => handler
});
module.exports = __toCommonJS(request_handler_exports);
var import_process = require("./process.js");
var import_assets = require("./assets.js");
var import_config = require("./config.js");
var import_utils = require("./utils/utils.js");
async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const { status, data } = await handleRequest(url);
  return Response.json(data, { status });
}
async function handler(req, res) {
  const { status, data } = await handleRequest(String(req.query.url));
  res.status(status).json(data);
}
async function handleRequest(url) {
  if (!url) {
    return {
      status: 400,
      data: { error: "url parameter is required" }
    };
  }
  if (!(0, import_utils.isRemote)(url)) {
    return {
      status: 400,
      data: { error: "local files should be imported as a module" }
    };
  }
  let asset;
  try {
    asset = await (0, import_assets.getAsset)(url);
  } catch {
    asset = await (0, import_assets.createAsset)(url);
    if (asset) {
      const videoConfig = await (0, import_config.getVideoConfig)();
      await (0, import_process.callHandler)("request.video.added", asset, videoConfig);
    }
    return { status: 200, data: asset };
  }
  return { status: 200, data: asset };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET
});
