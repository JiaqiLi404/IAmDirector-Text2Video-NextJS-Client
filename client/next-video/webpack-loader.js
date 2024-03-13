import path from "node:path";
import { readFile } from "node:fs/promises";
import { createAsset, getAssetConfigPath } from "./assets.js";
const raw = true;
async function loader(source) {
  const importPath = `${this.resourcePath}${this.resourceQuery ?? ""}`;
  const assetPath = path.resolve(await getAssetConfigPath(importPath));
  this.addDependency(assetPath);
  let asset;
  try {
    asset = await readFile(assetPath, "utf-8");
  } catch {
    asset = JSON.stringify(await createAsset(importPath, {
      status: "sourced"
    }));
  }
  return `export default ${asset}`;
}
export {
  loader as default,
  raw
};
