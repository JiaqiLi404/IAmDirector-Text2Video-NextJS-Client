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
var video_loader_exports = {};
__export(video_loader_exports, {
  createVideoRequest: () => createVideoRequest,
  defaultLoader: () => defaultLoader
});
module.exports = __toCommonJS(video_loader_exports);
var import_utils = require("./utils.js");
async function defaultLoader({ config: config2, src, width, height }) {
  let requestUrl = `${config2.path}?url=${encodeURIComponent(`${src}`)}`;
  if (width)
    requestUrl += `&w=${width}`;
  if (height)
    requestUrl += `&h=${height}`;
  return `${requestUrl}`;
}
function createVideoRequest(loader, props, callback) {
  return async (abortSignal) => {
    if (typeof props.src !== "string")
      return;
    try {
      const requestUrl = await loader({
        ...props,
        config: import_utils.config
      });
      const res = await fetch(requestUrl, { signal: abortSignal });
      const json = await res.json();
      if (res.ok) {
        callback(json);
      } else {
        let message = `[next-video] The request to ${res.url} failed. `;
        message += `Did you configure the \`${import_utils.config.path}\` route to handle video API requests?
`;
        throw new Error(message);
      }
    } catch (err) {
      if (!abortSignal.aborted) {
        console.error(err);
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createVideoRequest,
  defaultLoader
});
