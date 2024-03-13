/** @type {import('next').NextConfig} */
const { withNextVideo } = require('next-video/process');
const nextConfig = {
   eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
      'process.env.FLUENTFFMPEG_COV': false
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
};

module.exports = withNextVideo(nextConfig,{
  provider: 'backblaze',
  providerConfig: {
    backblaze: { endpoint: 'https://s3.us-west-000.backblazeb2.com' }
  }
});
