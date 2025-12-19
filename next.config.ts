import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo para production build
  ...(process.env.NODE_ENV === 'production' && { output: "export" }),
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
};

export default nextConfig;
