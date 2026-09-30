import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // The site is served from GitHub Pages as plain files.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
