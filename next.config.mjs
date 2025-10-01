/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dev18.intersmarthosting.in",
      "admin.brdluxe.com",
      "tiles.stadiamaps.com", // Remove https:// - just domain
      "tile.openstreetmap.org", // Add if you switch back to OSM
      "a.tile.openstreetmap.org",
      "b.tile.openstreetmap.org",
      "c.tile.openstreetmap.org",
      "admin.brdluxe.com"
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
