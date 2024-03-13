import { cwd } from "node:process";
import path from "node:path";
import { pathToFileURL } from "node:url";
const videoConfigDefault = {
  folder: "videos",
  path: "/api/video",
  provider: "mux",
  providerConfig: {}
};
async function getVideoConfig() {
  let nextConfig;
  try {
    nextConfig = await importConfig("next.config.js");
  } catch (err) {
    try {
      nextConfig = await importConfig("next.config.mjs");
    } catch {
      console.error("Failed to load next.config.js or next.config.mjs");
    }
  }
  return nextConfig?.serverRuntimeConfig?.nextVideo;
}
async function importConfig(file) {
  const absFilePath = path.resolve(cwd(), file);
  const fileUrl = pathToFileURL(absFilePath).href;
  return (await import(
    /* webpackIgnore: true */
    fileUrl
  ))?.default;
}
export {
  getVideoConfig,
  videoConfigDefault
};
