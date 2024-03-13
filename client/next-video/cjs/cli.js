#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_node_process = __toESM(require("node:process"), 1);
var import_env = __toESM(require("@next/env"), 1);
var import_logger = __toESM(require("./utils/logger.js"), 1);
var import_yargs = __toESM(require("yargs/yargs"), 1);
var init = __toESM(require("./cli/init.js"), 1);
var sync = __toESM(require("./cli/sync.js"), 1);
import_env.default.loadEnvConfig(import_node_process.default.cwd(), void 0, import_logger.default);
(0, import_yargs.default)(import_node_process.default.argv.slice(2)).command(init).command(sync).demandCommand().help().argv;
