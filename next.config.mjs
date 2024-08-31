/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		instrumentationHook: true,
		scrollRestoration: true,
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cmsradiatorlux.ru',
				port: '',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
