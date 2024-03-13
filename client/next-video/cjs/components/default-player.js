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
var default_player_exports = {};
__export(default_player_exports, {
  DefaultPlayer: () => DefaultPlayer
});
module.exports = __toCommonJS(default_player_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_transformer = require("../providers/mux/transformer.js");
const MuxPlayer = (0, import_react.lazy)(() => import("@mux/mux-player-react"));
const DefaultPlayer = (0, import_react.forwardRef)((allProps, forwardedRef) => {
  let {
    style,
    children,
    asset,
    controls,
    poster,
    blurDataURL,
    ...rest
  } = allProps;
  const slottedPoster = import_react.Children.toArray(children).find((child) => {
    return typeof child === "object" && "type" in child && child.props.slot === "poster";
  });
  if ((0, import_react.isValidElement)(slottedPoster)) {
    poster = "";
    blurDataURL = void 0;
  }
  const props = rest;
  const imgStyleProps = {};
  const playbackId = asset ? (0, import_transformer.getPlaybackId)(asset) : void 0;
  let isCustomPoster = true;
  let srcSet;
  if (playbackId && asset?.status === "ready") {
    props.src = null;
    props.playbackId = playbackId;
    if (poster) {
      isCustomPoster = poster !== (0, import_transformer.getPosterURLFromPlaybackId)(playbackId, props);
      if (!isCustomPoster) {
        srcSet = `${(0, import_transformer.getPosterURLFromPlaybackId)(playbackId, { ...props, width: 480 })} 480w,${(0, import_transformer.getPosterURLFromPlaybackId)(playbackId, { ...props, width: 640 })} 640w,${(0, import_transformer.getPosterURLFromPlaybackId)(playbackId, { ...props, width: 960 })} 960w,${(0, import_transformer.getPosterURLFromPlaybackId)(playbackId, { ...props, width: 1280 })} 1280w,${(0, import_transformer.getPosterURLFromPlaybackId)(playbackId, { ...props, width: 1600 })} 1600w,${poster} 1920w`;
      }
    }
  }
  if (blurDataURL) {
    const showGeneratedBlur = !isCustomPoster && blurDataURL === asset?.blurDataURL;
    const showCustomBlur = isCustomPoster && blurDataURL !== asset?.blurDataURL;
    if (showGeneratedBlur || showCustomBlur) {
      imgStyleProps.color = "transparent";
      imgStyleProps.backgroundSize = "cover";
      imgStyleProps.backgroundPosition = "center";
      imgStyleProps.backgroundRepeat = "no-repeat";
      imgStyleProps.backgroundImage = `url('data:image/svg+xml;charset=utf-8,${svgBlurImage(blurDataURL)}')`;
    }
  }
  if (poster) {
    children = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "img",
        {
          slot: "poster",
          src: isCustomPoster ? poster : void 0,
          srcSet,
          style: imgStyleProps,
          "aria-hidden": "true"
        }
      )
    ] });
    poster = "";
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: null, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    MuxPlayer,
    {
      ref: forwardedRef,
      style: {
        "--controls": controls === false ? "none" : void 0,
        ...style
      },
      children,
      poster,
      ...props
    }
  ) });
});
function svgBlurImage(blurDataURL) {
  const svg = (
    /*html*/
    `<svg xmlns="http://www.w3.org/2000/svg"><filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="20"/><feComponentTransfer><feFuncA type="discrete" tableValues="1 1"/></feComponentTransfer></filter><g filter="url(#b)"><image width="100%" height="100%" href="${blurDataURL}"/></g></svg>`
  );
  return svg.replace(/#/g, "%23");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultPlayer
});
