/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
  reactStrictMode: true,
}

module.exports = nextConfig
