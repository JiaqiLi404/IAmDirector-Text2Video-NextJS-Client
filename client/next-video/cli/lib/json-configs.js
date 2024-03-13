import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PACKAGE_NAME } from "../../constants.js";
function updateTSConfigFileContent(tsContents) {
  const newItem = "video.d.ts";
  const includeRegex = /("include"\s*:\s*\[)([^\]]*?)(\])/;
  const addVideoDts = (_match, p1, p2, p3) => {
    const trimmedContent = p2.trim();
    if (/\r?\n/.test(p2)) {
      const whitespace = p2.match(/^\s*/)?.[0] || "";
      return `${p1}${whitespace}"${newItem}",${p2}${p3}`;
    } else {
      return `${p1}"${newItem}", ${trimmedContent ? `${trimmedContent}` : ""}${p3}`;
    }
  };
  const updatedContents = tsContents.replace(includeRegex, addVideoDts);
  JSON.parse(updatedContents);
  return updatedContents;
}
async function checkPackageJsonForNextVideo(packagePath = "./package.json") {
  const pkg = await readFile(packagePath, "utf-8");
  const json = JSON.parse(pkg);
  return !!(json.devDependencies?.[PACKAGE_NAME] || json.dependencies?.[PACKAGE_NAME]);
}
async function getNextVideoVersion() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const scriptRoot = path.join(scriptDir, "..", "..", "..");
  const packagePath = path.join(scriptRoot, "package.json");
  const pkg = JSON.parse(await readFile(packagePath, "utf-8"));
  return pkg.version;
}
export {
  checkPackageJsonForNextVideo,
  getNextVideoVersion,
  updateTSConfigFileContent
};
