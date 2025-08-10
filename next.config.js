const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: false,
  },
  api: {
    bodyParser: true,
    responseLimit: false,
    externalResolver: false,
  },
};

module.exports = nextConfig;
