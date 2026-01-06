/** @type {import('next').NextConfig} */

// Bundle Analyzer - helps you see what's making your site heavy
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // Compresses responses (makes pages load faster)
  compress: true,

  // Redirect non-www to www (SEO best practice)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "brdluxe.com",
          },
        ],
        destination: "https://www.brdluxe.com/:path*",
        permanent: true,
      },
    ];
  },

  // Security & caching headers
  async headers() {
    return [
      {
        // Cache Next.js static files (JS/CSS) for 1 year
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          // Security headers
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        // Cache images from /public/images for 1 day
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  // Allow Next.js Image component to load images from your CMS
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.brdluxe.com",
      },
    ],
  },

  // Fix for packages that don't work in browser (like PDF generators)
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

// Wrap config with bundle analyzer
export default withBundleAnalyzer(nextConfig);
