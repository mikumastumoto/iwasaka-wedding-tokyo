// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静的エクスポート
  images: {
    unoptimized: true, // GitHub Pages では必須
  },
  basePath: "/iwasaka-wedding-tokyo", // ← GitHubリポジトリ名に合わせる
  assetPrefix: '/iwasaka-wedding-tokyo/',
};

module.exports = nextConfig;
