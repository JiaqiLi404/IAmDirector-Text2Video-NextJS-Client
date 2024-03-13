function transform(asset) {
  const providerMetadata = asset.providerMetadata?.backblaze;
  if (!providerMetadata)
    return asset;
  const src = new URL(providerMetadata.endpoint);
  src.hostname = `${providerMetadata.bucket}.${src.hostname}`;
  src.pathname = providerMetadata.key;
  const source = { src: `${src}` };
  return {
    ...asset,
    sources: [source]
  };
}
export {
  transform
};
