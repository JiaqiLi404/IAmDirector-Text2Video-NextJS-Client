"use strict";
"use client";
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
var video_exports = {};
__export(video_exports, {
  default: () => video_default,
  getVideoProps: () => getVideoProps
});
module.exports = __toCommonJS(video_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_default_player = require("./default-player.js");
var import_alert = require("./alert.js");
var import_video_loader = require("./video-loader.js");
var import_utils = require("./utils.js");
var transformers = __toESM(require("../providers/transformers.js"), 1);
const DEV_MODE = process.env.NODE_ENV === "development";
const NextVideo = (0, import_react.forwardRef)((props, forwardedRef) => {
  let {
    as: VideoPlayer = import_default_player.DefaultPlayer,
    loader = import_video_loader.defaultLoader,
    transform = defaultTransformer,
    className,
    style,
    src,
    width,
    height
  } = props;
  let [asset, setAsset] = (0, import_react.useState)(typeof src === "object" ? src : void 0);
  const [playing, setPlaying] = (0, import_react.useState)(false);
  if (typeof src === "object") {
    asset = src;
    src = void 0;
  }
  const loaderProps = { src, width, height };
  const request = (0, import_video_loader.createVideoRequest)(loader, loaderProps, (json) => setAsset(json));
  const status = asset?.status;
  const fileExtension = (0, import_utils.getUrlExtension)(src);
  const needsPolling = DEV_MODE && typeof src === "string" && status != "ready" && !["m3u8", "mpd"].includes(fileExtension ?? "");
  (0, import_utils.usePolling)(request, needsPolling ? 1e3 : null);
  const videoProps = getVideoProps(
    { ...props, transform, src },
    { asset }
  );
  if (!(0, import_utils.isReactComponent)(VideoPlayer)) {
    console.warn("The `as` property is not a valid component:", VideoPlayer);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: `${className ? `${className} ` : ""}next-video-container`,
      style,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
          /* css */
          children: `
        .next-video-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
        }

        [data-next-video] {
          position: relative;
          width: 100%;
          height: 100%;
          display: inline-block;
          line-height: 0;
        }

        [data-next-video] img {
          object-fit: var(--media-object-fit, contain);
          object-position: var(--media-object-position, center);
          background: center / var(--media-object-fit, contain) no-repeat transparent;
          width: 100%;
          height: 100%;
        }
        `
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          VideoPlayer,
          {
            ref: forwardedRef,
            "data-next-video": status ?? "",
            style: { width, height },
            asset,
            onPlaying: () => setPlaying(true),
            onPause: () => setPlaying(false),
            ...videoProps
          }
        ),
        DEV_MODE && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_alert.Alert,
          {
            hidden: Boolean(playing || !status || status === "ready"),
            status
          }
        )
      ]
    }
  );
});
function getVideoProps(allProps, state) {
  const { asset } = state;
  const {
    controls = true,
    as,
    className,
    style,
    src,
    poster,
    blurDataURL,
    loader,
    transform,
    ...rest
  } = allProps;
  const props = {
    src,
    controls,
    blurDataURL,
    ...rest
  };
  if (typeof poster === "object") {
    props.poster = poster.src;
    props.blurDataURL ?? (props.blurDataURL = poster.blurDataURL);
  } else {
    props.poster = poster;
  }
  if (asset) {
    if (asset.status === "ready") {
      props.blurDataURL ?? (props.blurDataURL = asset.blurDataURL);
      const transformedAsset = transform(asset);
      if (transformedAsset) {
        props.src = transformedAsset.sources?.[0]?.src;
        props.poster ?? (props.poster = transformedAsset.poster);
      }
    } else {
      props.src = (0, import_utils.toSymlinkPath)(asset.originalFilePath);
    }
  }
  return props;
}
function defaultTransformer(asset) {
  const provider = asset.provider ?? import_utils.config.provider;
  for (let [key, transformer] of Object.entries(transformers)) {
    if (key === (0, import_utils.camelCase)(provider)) {
      return transformer.transform(asset);
    }
  }
}
var video_default = NextVideo;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getVideoProps
});
