import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Aumentar timeout para build
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Limitar concurrent workers
  swcMinify: true,
};

export default nextConfig;
