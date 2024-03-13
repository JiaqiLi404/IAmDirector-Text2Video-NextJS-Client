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
var utils_exports = {};
__export(utils_exports, {
  camelCase: () => camelCase,
  config: () => config,
  getUrlExtension: () => getUrlExtension,
  isReactComponent: () => isReactComponent,
  toSymlinkPath: () => toSymlinkPath,
  useInterval: () => useInterval,
  usePolling: () => usePolling
});
module.exports = __toCommonJS(utils_exports);
var import_react = require("react");
const config = JSON.parse(
  process.env.NEXT_PUBLIC_DEV_VIDEO_OPTS ?? process.env.NEXT_PUBLIC_VIDEO_OPTS ?? "{}"
);
const MUX_VIDEO_DOMAIN = "mux.com";
const DEFAULT_POLLING_INTERVAL = 5e3;
const FILES_FOLDER = `${config.folder ?? "videos"}/`;
function toSymlinkPath(path) {
  if (!path?.startsWith(FILES_FOLDER))
    return path;
  return path?.replace(FILES_FOLDER, `_next-video/`);
}
function camelCase(name) {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
}
function getUrlExtension(url) {
  if (typeof url === "string") {
    return url.split(/[#?]/)[0].split(".").pop()?.trim();
  }
}
function usePolling(callback, interval = DEFAULT_POLLING_INTERVAL) {
  const abortControllerRef = (0, import_react.useRef)(new AbortController());
  (0, import_react.useEffect)(() => {
    abortControllerRef.current = new AbortController();
    callback(abortControllerRef.current.signal);
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);
  const intervalFn = (0, import_react.useCallback)(() => {
    return callback(abortControllerRef.current.signal);
  }, []);
  useInterval(intervalFn, interval);
}
function useInterval(callback, delay) {
  const savedCallback = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    savedCallback.current = callback;
  }, [callback]);
  (0, import_react.useEffect)(() => {
    let id;
    const tick = async () => {
      await savedCallback.current?.();
      if (delay != null) {
        id = setTimeout(tick, delay);
      }
    };
    if (delay != null) {
      id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}
function isReactComponent(component) {
  return isClassComponent(component) || typeof component === "function" || isExoticComponent(component);
}
function isClassComponent(component) {
  return typeof component === "function" && (() => {
    const proto = Object.getPrototypeOf(component);
    return proto.prototype && proto.prototype.isReactComponent;
  })();
}
function isExoticComponent(component) {
  return typeof component === "object" && typeof component.$$typeof === "symbol" && ["react.memo", "react.forward_ref"].includes(component.$$typeof.description);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  camelCase,
  config,
  getUrlExtension,
  isReactComponent,
  toSymlinkPath,
  useInterval,
  usePolling
});
