/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev18.intersmarthosting.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.brdluxe.com",
        pathname: "/**",
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
