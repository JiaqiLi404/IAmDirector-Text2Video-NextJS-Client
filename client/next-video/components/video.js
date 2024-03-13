"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useState } from "react";
import { DefaultPlayer } from "./default-player.js";
import { Alert } from "./alert.js";
import { createVideoRequest, defaultLoader } from "./video-loader.js";
import { config, camelCase, toSymlinkPath, usePolling, isReactComponent, getUrlExtension } from "./utils.js";
import * as transformers from "../providers/transformers.js";
const DEV_MODE = true;
const NextVideo = forwardRef((props, forwardedRef) => {
  let {
    as: VideoPlayer = DefaultPlayer,
    loader = defaultLoader,
    transform = defaultTransformer,
    className,
    style,
    src,
    width,
    height
  } = props;
  let [asset, setAsset] = useState(typeof src === "object" ? src : void 0);
  const [playing, setPlaying] = useState(false);
  if (typeof src === "object") {
    asset = src;
    src = void 0;
  }
  const loaderProps = { src, width, height };
  const request = createVideoRequest(loader, loaderProps, (json) => setAsset(json));
  const status = asset?.status;
  const fileExtension = getUrlExtension(src);
  const needsPolling = DEV_MODE && typeof src === "string" && status != "ready" && !["m3u8", "mpd"].includes(fileExtension ?? "");
  usePolling(request, needsPolling ? 1e3 : null);
  const videoProps = getVideoProps(
    { ...props, transform, src },
    { asset }
  );
  if (!isReactComponent(VideoPlayer)) {
    console.warn("The `as` property is not a valid component:", VideoPlayer);
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${className ? `${className} ` : ""}next-video-container`,
      style,
      children: [
        /* @__PURE__ */ jsx("style", {
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
        /* @__PURE__ */ jsx(
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
        DEV_MODE && /* @__PURE__ */ jsx(
          Alert,
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
      props.src = toSymlinkPath(asset.originalFilePath);
    }
  }
  return props;
}
function defaultTransformer(asset) {
  const provider = asset.provider ?? config.provider;
  for (let [key, transformer] of Object.entries(transformers)) {
    if (key === camelCase(provider)) {
      return transformer.transform(asset);
    }
  }
}
var video_default = NextVideo;
export {
  video_default as default,
  getVideoProps
};
