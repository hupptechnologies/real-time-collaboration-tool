import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	devIndicators: false,
	experimental: {
		typedRoutes: true
	},
	eslint: {
		ignoreDuringBuilds: true,
		dirs: ['src']
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: true // 308 Permanent Redirect
			}
		];
	}
};

export default nextConfig;
