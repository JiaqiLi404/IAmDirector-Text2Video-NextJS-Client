import * as path from "node:path";
import { cwd } from "node:process";
import { stat, readFile, writeFile, mkdir } from "node:fs/promises";
import { getVideoConfig } from "./config.js";
import { deepMerge, camelCase, isRemote, toSafePath } from "./utils/utils.js";
import * as transformers from "./providers/transformers.js";
async function getAsset(filePath) {
  const assetConfigPath = await getAssetConfigPath(filePath);
  const file = await readFile(assetConfigPath);
  const asset = JSON.parse(file.toString());
  return asset;
}
async function getAssetConfigPath(filePath) {
  return `${await getAssetPath(filePath)}.json`;
}
async function getAssetPath(filePath) {
  if (!isRemote(filePath))
    return filePath;
  const { folder, remoteSourceAssetPath = defaultRemoteSourceAssetPath } = await getVideoConfig();
  if (!folder)
    throw new Error("Missing video `folder` config.");
  return path.join(folder, remoteSourceAssetPath(filePath));
}
function defaultRemoteSourceAssetPath(url) {
  const urlObj = new URL(url);
  return toSafePath(decodeURIComponent(`${urlObj.hostname}${urlObj.pathname}`));
}
async function createAsset(filePath, assetDetails) {
  const videoConfig = await getVideoConfig();
  const assetConfigPath = await getAssetConfigPath(filePath);
  let originalFilePath = filePath;
  if (!isRemote(filePath)) {
    originalFilePath = path.relative(cwd(), filePath);
  }
  const newAssetDetails = {
    status: "pending",
    // overwritable
    ...assetDetails,
    originalFilePath,
    provider: videoConfig.provider,
    providerMetadata: {},
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  if (!isRemote(filePath)) {
    try {
      newAssetDetails.size = (await stat(filePath))?.size;
    } catch {
    }
  }
  try {
    await mkdir(path.dirname(assetConfigPath), { recursive: true });
    await writeFile(assetConfigPath, JSON.stringify(newAssetDetails), {
      flag: "wx"
    });
  } catch (err) {
    if (err.code === "EEXIST") {
      return;
    }
    throw err;
  }
  return newAssetDetails;
}
async function updateAsset(filePath, assetDetails) {
  const assetConfigPath = await getAssetConfigPath(filePath);
  const currentAsset = await getAsset(filePath);
  if (!currentAsset) {
    throw new Error(`Asset not found: ${filePath}`);
  }
  let newAssetDetails = deepMerge(currentAsset, assetDetails, {
    updatedAt: Date.now()
  });
  newAssetDetails = transformAsset(transformers, newAssetDetails);
  await writeFile(assetConfigPath, JSON.stringify(newAssetDetails));
  return newAssetDetails;
}
function transformAsset(transformers2, asset) {
  const provider = asset.provider;
  if (!provider)
    return asset;
  for (let [key, transformer] of Object.entries(transformers2)) {
    if (key === camelCase(provider)) {
      return transformer.transform(asset);
    }
  }
  return asset;
}
export {
  createAsset,
  getAsset,
  getAssetConfigPath,
  updateAsset
};
