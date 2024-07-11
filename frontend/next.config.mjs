/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpackDevMiddlewareを設定するための適切な方法
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // 1秒ごとに変更をチェック
        aggregateTimeout: 300, // 変更があった場合、300ms待ってから再ビルド
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept' },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_GEOCODING_API_KEY: process.env.NEXT_PUBLIC_GEOCODING_API_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  },
};

export default nextConfig;
