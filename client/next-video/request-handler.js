import { callHandler } from "./process.js";
import { createAsset, getAsset } from "./assets.js";
import { getVideoConfig } from "./config.js";
import { isRemote } from "./utils/utils.js";
async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const { status, data } = await handleRequest(url);
  return Response.json(data, { status });
}
async function handler(req, res) {
  const { status, data } = await handleRequest(String(req.query.url));
  res.status(status).json(data);
}
async function handleRequest(url) {
  if (!url) {
    return {
      status: 400,
      data: { error: "url parameter is required" }
    };
  }
  if (!isRemote(url)) {
    return {
      status: 400,
      data: { error: "local files should be imported as a module" }
    };
  }
  let asset;
  try {
    asset = await getAsset(url);
  } catch {
    asset = await createAsset(url);
    if (asset) {
      const videoConfig = await getVideoConfig();
      // await callHandler("request.video.added", asset, videoConfig);
    }
    return { status: 200, data: asset };
  }
  return { status: 200, data: asset };
}
export {
  GET,
  handler as default
};
