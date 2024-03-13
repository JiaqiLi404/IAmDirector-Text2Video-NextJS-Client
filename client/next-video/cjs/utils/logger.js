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
var logger_exports = {};
__export(logger_exports, {
  add: () => add,
  base: () => base,
  default: () => logger_default,
  error: () => error,
  info: () => info,
  label: () => label,
  space: () => space,
  success: () => success,
  warning: () => warning
});
module.exports = __toCommonJS(logger_exports);
var import_chalk = __toESM(require("chalk"), 1);
function base(type, ...messages) {
  console[type](...messages);
}
function info(...messages) {
  base("log", import_chalk.default.blue.bold("-"), ...messages);
}
function success(...messages) {
  base("log", import_chalk.default.green.bold("\u2713"), ...messages);
}
function add(...messages) {
  base("log", import_chalk.default.blue.green("+"), ...messages);
}
function warning(...messages) {
  base("log", import_chalk.default.yellow.bold("!"), ...messages);
}
function error(...messages) {
  base("error", import_chalk.default.red.bold("\u2717"), ...messages);
  base("log", "");
}
function space(...messages) {
  base("log", " ", ...messages);
}
function label(detail) {
  return import_chalk.default.magenta.bold(detail);
}
var logger_default = {
  base,
  info,
  success,
  add,
  warning,
  error,
  space,
  label
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  base,
  error,
  info,
  label,
  space,
  success,
  warning
});
