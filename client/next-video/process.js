import { videoHandler, callHandler } from "./video-handler.js";
import { uploadLocalFile } from "./handlers/local-upload.js";
import { uploadRequestedFile } from "./handlers/api-request.js";
import log from "./utils/logger.js";
import { withNextVideo } from "./with-next-video.js";
try {
  // videoHandler("local.video.added", uploadLocalFile);
  // videoHandler("request.video.added", uploadRequestedFile);
} catch (err) {
  log.error("An exception occurred within next-video. You may need to restart your dev server.");
  console.error(err);
}
export {
  callHandler,
  videoHandler,
  withNextVideo
};
