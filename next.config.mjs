/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  assetPrefix: isProd
    ? 'https://cdn.jsdelivr.net/gh/Im0ctopus/cdn-devscope-room@1.08'
    : undefined,
}

export default nextConfig
