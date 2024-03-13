import * as path from "node:path";
import { getVideoConfig } from "../config.js";
import { isRemote } from "./utils.js";
async function createAssetKey(filePathOrURL, provider) {
  const { folder, providerConfig } = await getVideoConfig();
  const config = providerConfig[provider];
  const { generateAssetKey = defaultGenerateAssetKey } = config ?? {};
  return generateAssetKey(filePathOrURL, folder);
}
function defaultGenerateAssetKey(filePathOrURL, folder) {
  if (!isRemote(filePathOrURL))
    return filePathOrURL;
  const url = new URL(filePathOrURL);
  return path.posix.join(folder, path.basename(decodeURIComponent(url.pathname)));
}
export {
  createAssetKey
};
