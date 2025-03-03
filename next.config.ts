import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['src']
  }
};

export default nextConfig;
