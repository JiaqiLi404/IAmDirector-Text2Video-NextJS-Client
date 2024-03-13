function transform(asset) {
  const providerDetails = asset.providerMetadata?.["vercel-blob"] ?? asset.externalIds;
  if (!providerDetails)
    return asset;
  const source = {
    src: providerDetails.url
  };
  if (providerDetails.contentType) {
    source.type = providerDetails.contentType;
  }
  return {
    ...asset,
    sources: [source]
  };
}
export {
  transform
};
