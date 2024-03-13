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
var process_exports = {};
__export(process_exports, {
  callHandler: () => import_video_handler.callHandler,
  videoHandler: () => import_video_handler.videoHandler,
  withNextVideo: () => import_with_next_video.withNextVideo
});
module.exports = __toCommonJS(process_exports);
var import_video_handler = require("./video-handler.js");
var import_local_upload = require("./handlers/local-upload.js");
var import_api_request = require("./handlers/api-request.js");
var import_logger = __toESM(require("./utils/logger.js"), 1);
var import_with_next_video = require("./with-next-video.js");
try {
  (0, import_video_handler.videoHandler)("local.video.added", import_local_upload.uploadLocalFile);
  (0, import_video_handler.videoHandler)("request.video.added", import_api_request.uploadRequestedFile);
} catch (err) {
  import_logger.default.error("An exception occurred within next-video. You may need to restart your dev server.");
  console.error(err);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  callHandler,
  videoHandler,
  withNextVideo
});
