import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
      // Add other external image domains as needed
    ],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
