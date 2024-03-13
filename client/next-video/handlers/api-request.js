import * as providers from "../providers/providers.js";
import { camelCase } from "../utils/utils.js";
async function uploadRequestedFile(asset, config) {
  for (let [key, provider] of Object.entries(providers)) {
    if (key === camelCase(config.provider)) {
      return provider.uploadRequestedFile(asset);
    }
  }
}
export {
  uploadRequestedFile
};
