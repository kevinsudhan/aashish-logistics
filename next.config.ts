import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Media placeholders are replaced with local files in /public by default.
    // Add remote hosts here (e.g. a CDN or DAM) when wiring real photography.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
