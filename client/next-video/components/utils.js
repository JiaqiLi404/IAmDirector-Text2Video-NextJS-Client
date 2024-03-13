import { useEffect, useRef, useCallback } from "react";
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
  const abortControllerRef = useRef(new AbortController());
  useEffect(() => {
    abortControllerRef.current = new AbortController();
    callback(abortControllerRef.current.signal);
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);
  const intervalFn = useCallback(() => {
    return callback(abortControllerRef.current.signal);
  }, []);
  useInterval(intervalFn, interval);
}
function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    let id;
    // const tick = async () => {
    //   await savedCallback.current?.();
    //   if (delay != null) {
    //     id = setTimeout(tick, delay);
    //   }
    // };
    // if (delay != null) {
    //   id = setTimeout(tick, delay);
    //   return () => clearTimeout(id);
    // }
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
export {
  camelCase,
  config,
  getUrlExtension,
  isReactComponent,
  toSymlinkPath,
  useInterval,
  usePolling
};
