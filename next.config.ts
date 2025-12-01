import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "example.com",
      "inupgro.s3.ap-south-1.amazonaws.com",
      "techuniversity.com",

      // ... any other domains you need
    ],
    unoptimized: true,
  },
};

export default nextConfig;
