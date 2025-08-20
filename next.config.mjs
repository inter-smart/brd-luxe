/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev18.intersmarthosting.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
