import type { NextConfig } from 'next';
import type { Configuration, RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	webpack: (config: Configuration) => {
		if (config.module !== null) {
			config.module = { rules: [] };
		}

		(config.module.rules as RuleSetRule[]).push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});

		return config;
	},
	devIndicators: false,
	experimental: {
		typedRoutes: true
	},
	eslint: {
		ignoreDuringBuilds: true,
		dirs: ['src']
	}
};

export default nextConfig;
