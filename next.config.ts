/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // API Routes を Edge Functions ではなく Node.js ランタイムで動作させる
  experimental: {
    serverActions: false, // 型の警告を防ぐために残しておくと良い場合も
  },
  // Next.js 13以降でAPIルートをNode.jsランタイムで動かす設定
  api: {
    bodyParser: true,
    responseLimit: false,
    externalResolver: false,
  },
};

export default nextConfig;
