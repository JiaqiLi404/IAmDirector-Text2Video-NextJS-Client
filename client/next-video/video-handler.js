const HANDLERS = {};
const DEFAULT_HANDLER_CONFIG = {
  provider: "mux"
};
async function callHandler(event, data, config = {}) {
  const mergedConfig = { ...DEFAULT_HANDLER_CONFIG, ...config };
  const handler = HANDLERS[event];
  if (!handler) {
    return;
  }
  return handler(data, mergedConfig);
}
function videoHandler(event, callback) {
  HANDLERS[event] = callback;
  return async (event2) => callback(event2);
}
export {
  HANDLERS,
  callHandler,
  videoHandler
};
