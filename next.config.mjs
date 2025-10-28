/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: [
  //     "dev18.intersmarthosting.in",
  //     "admin.brdluxe.com",
  //   ], // 👈 add your WP domain here
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.brdluxe.com",
      },
      {
        protocol: "http",
        hostname: "admin.brdluxe.com",
      },
    ],
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
