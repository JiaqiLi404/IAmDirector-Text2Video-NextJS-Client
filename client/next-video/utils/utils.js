function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function camelCase(name) {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
}
function isRemote(filePath) {
  return /^https?:\/\//.test(filePath);
}
function toSafePath(str) {
  return str.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
}
function deepMerge(...objects) {
  const result = {};
  for (const obj of objects) {
    for (const key in obj) {
      const existing = result[key];
      const val = obj[key];
      if (Array.isArray(val) && Array.isArray(existing)) {
        result[key] = existing.concat(...val);
      } else if (isObject(val) && isObject(existing)) {
        result[key] = deepMerge(existing, val);
      } else {
        result[key] = val;
      }
    }
  }
  return result;
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
export {
  camelCase,
  deepMerge,
  isObject,
  isRemote,
  sleep,
  toSafePath
};
