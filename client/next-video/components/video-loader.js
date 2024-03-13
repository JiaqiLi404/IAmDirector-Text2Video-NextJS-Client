import { config } from "./utils.js";
async function defaultLoader({ config: config2, src, width, height }) {
  let requestUrl = `${config2.path}?url=${encodeURIComponent(`${src}`)}`;
  if (width)
    requestUrl += `&w=${width}`;
  if (height)
    requestUrl += `&h=${height}`;
  return `${requestUrl}`;
}
function createVideoRequest(loader, props, callback) {
  return async (abortSignal) => {
    if (typeof props.src !== "string")
      return;
    try {
      const requestUrl = await loader({
        ...props,
        config
      });
      // console.log("requestUrl", requestUrl)
      const res = await fetch(requestUrl, { signal: abortSignal });
      // const json = await res.json();
      if (res.ok) {
        // callback(json);
      } else {
        let message = `[next-video] The request to ${res.url} failed. `;
        message += `Did you configure the \`${config.path}\` route to handle video API requests?
`;
        throw new Error(message);
      }
    } catch (err) {
      if (!abortSignal.aborted) {
        console.error(err);
      }
    }
  };
}
export {
  createVideoRequest,
  defaultLoader
};
