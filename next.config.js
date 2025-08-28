/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['playwright-core']
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'sharp$': false,
      'onnxruntime-node$': false,
    }
    return config
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1',
  },
}

module.exports = nextConfig