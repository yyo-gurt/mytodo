/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  serverRuntimeConfig: {
    secret: process.env.SECRET,
    refresh: process.env.REFRESH
  }
}

module.exports = nextConfig
