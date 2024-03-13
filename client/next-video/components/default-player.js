import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, Suspense, lazy, Children, isValidElement } from "react";
import { getPlaybackId, getPosterURLFromPlaybackId } from "../providers/mux/transformer.js";
const MuxPlayer = lazy(() => import("@mux/mux-player-react"));
const DefaultPlayer = forwardRef((allProps, forwardedRef) => {
  let {
    style,
    children,
    asset,
    controls,
    poster,
    blurDataURL,
    ...rest
  } = allProps;
  const slottedPoster = Children.toArray(children).find((child) => {
    return typeof child === "object" && "type" in child && child.props.slot === "poster";
  });
  if (isValidElement(slottedPoster)) {
    poster = "";
    blurDataURL = void 0;
  }
  const props = rest;
  const imgStyleProps = {};
  const playbackId = asset ? getPlaybackId(asset) : void 0;
  let isCustomPoster = true;
  let srcSet;
  if (playbackId && asset?.status === "ready") {
    props.src = null;
    props.playbackId = playbackId;
    if (poster) {
      isCustomPoster = poster !== getPosterURLFromPlaybackId(playbackId, props);
      if (!isCustomPoster) {
        srcSet = `${getPosterURLFromPlaybackId(playbackId, { ...props, width: 480 })} 480w,${getPosterURLFromPlaybackId(playbackId, { ...props, width: 640 })} 640w,${getPosterURLFromPlaybackId(playbackId, { ...props, width: 960 })} 960w,${getPosterURLFromPlaybackId(playbackId, { ...props, width: 1280 })} 1280w,${getPosterURLFromPlaybackId(playbackId, { ...props, width: 1600 })} 1600w,${poster} 1920w`;
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
    children = /* @__PURE__ */ jsxs(Fragment, { children: [
      children,
      /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
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
export {
  DefaultPlayer
};
