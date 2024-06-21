/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	i18n: {
		locales: ["en", "vi"],
		defaultLocale: "en",
	},
	env: {
		API_URL: process.env.API_URL,
		API_VERSION: process.env.API_VERSION,
	},
}

export default nextConfig
