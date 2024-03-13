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
var video_handler_exports = {};
__export(video_handler_exports, {
  HANDLERS: () => HANDLERS,
  callHandler: () => callHandler,
  videoHandler: () => videoHandler
});
module.exports = __toCommonJS(video_handler_exports);
const HANDLERS = {};
const DEFAULT_HANDLER_CONFIG = {
  provider: "mux"
};
async function callHandler(event, data, config = {}) {
  const mergedConfig = { ...DEFAULT_HANDLER_CONFIG, ...config };
  const handler = HANDLERS[event];
  if (!handler) {
    return;
  }
  return handler(data, mergedConfig);
}
function videoHandler(event, callback) {
  HANDLERS[event] = callback;
  return async (event2) => callback(event2);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HANDLERS,
  callHandler,
  videoHandler
});
