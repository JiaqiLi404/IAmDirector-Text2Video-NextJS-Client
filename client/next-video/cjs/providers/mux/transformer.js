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
var transformer_exports = {};
__export(transformer_exports, {
  getPlaybackId: () => getPlaybackId,
  getPosterURLFromPlaybackId: () => getPosterURLFromPlaybackId,
  transform: () => transform
});
module.exports = __toCommonJS(transformer_exports);
const MUX_VIDEO_DOMAIN = "mux.com";
function transform(asset, props) {
  const playbackId = getPlaybackId(asset);
  if (!playbackId)
    return asset;
  return {
    ...asset,
    sources: [
      { src: `https://stream.mux.com/${playbackId}.m3u8`, type: "application/x-mpegURL" }
    ],
    poster: getPosterURLFromPlaybackId(playbackId, {
      customDomain: props?.customDomain,
      thumbnailTime: props?.thumbnailTime ?? props?.startTime,
      token: props?.tokens?.thumbnail
    })
  };
}
function getPlaybackId(asset) {
  const providerMetadata = asset.providerMetadata?.mux ?? asset.externalIds;
  return providerMetadata?.playbackId;
}
const getPosterURLFromPlaybackId = (playbackId, { token, thumbnailTime, width, customDomain = MUX_VIDEO_DOMAIN } = {}) => {
  const time = token == null ? thumbnailTime : void 0;
  const { aud } = parseJwt(token);
  if (token && aud !== "t") {
    return;
  }
  return `https://image.${customDomain}/${playbackId}/thumbnail.webp${toQuery({
    token,
    time,
    width
  })}`;
};
function toQuery(obj) {
  const params = toParams(obj).toString();
  return params ? "?" + params : "";
}
function toParams(obj) {
  const params = {};
  for (const key in obj) {
    if (obj[key] != null)
      params[key] = obj[key];
  }
  return new URLSearchParams(params);
}
function parseJwt(token) {
  const base64Url = (token ?? "").split(".")[1];
  if (!base64Url)
    return {};
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64).split("").map(function(c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join("")
  );
  return JSON.parse(jsonPayload);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPlaybackId,
  getPosterURLFromPlaybackId,
  transform
});
