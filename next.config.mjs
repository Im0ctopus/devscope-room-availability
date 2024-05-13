/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  assetPrefix: isProd ? process.env.CDN : undefined,
}

export default nextConfig
