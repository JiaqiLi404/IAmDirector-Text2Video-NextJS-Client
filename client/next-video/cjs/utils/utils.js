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
  deepMerge: () => deepMerge,
  isObject: () => isObject,
  isRemote: () => isRemote,
  sleep: () => sleep,
  toSafePath: () => toSafePath
});
module.exports = __toCommonJS(utils_exports);
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function camelCase(name) {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
}
function isRemote(filePath) {
  return /^https?:\/\//.test(filePath);
}
function toSafePath(str) {
  return str.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
}
function deepMerge(...objects) {
  const result = {};
  for (const obj of objects) {
    for (const key in obj) {
      const existing = result[key];
      const val = obj[key];
      if (Array.isArray(val) && Array.isArray(existing)) {
        result[key] = existing.concat(...val);
      } else if (isObject(val) && isObject(existing)) {
        result[key] = deepMerge(existing, val);
      } else {
        result[key] = val;
      }
    }
  }
  return result;
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  camelCase,
  deepMerge,
  isObject,
  isRemote,
  sleep,
  toSafePath
});
