import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
