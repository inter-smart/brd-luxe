/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dev18.intersmarthosting.in"
    ], // 👈 add your WP domain here
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        canvas: false,
      };
    }
    return config;
  },
};
// module.exports = nextConfig;
export default nextConfig;
