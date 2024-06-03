/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000, // 1秒ごとに変更をチェック
      aggregateTimeout: 300, // 変更があった場合、300ms待ってから再ビルド
    };
    return config;
  },
};

export default nextConfig;
