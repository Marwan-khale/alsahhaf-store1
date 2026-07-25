import type { NextConfig } from "next";

/**
 * Base Next.js configuration.
 * Intentionally minimal — no business logic, no store-specific rewrites/redirects.
 * Extend this file only through documented, approved configuration changes.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
