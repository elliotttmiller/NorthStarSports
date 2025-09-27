import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants'

const nextConfig = async (phase: string): Promise<NextConfig> => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd = phase === PHASE_PRODUCTION_BUILD

  const config: NextConfig = {
    // TypeScript configuration
    typescript: {
      ignoreBuildErrors: false,
      tsconfigPath: './tsconfig.json',
    },

    // ESLint configuration
    eslint: {
      ignoreDuringBuilds: false,
      dirs: ['app', 'components', 'lib', 'store'],
    },

    // Image optimization
    images: {
      domains: ['images.unsplash.com'],
      formats: ['image/webp', 'image/avif'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 60,
    },

    // Performance optimizations
    swcMinify: true,
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    
    // Production optimizations
    ...(isProd && {
      productionBrowserSourceMaps: false,
    }),

    // Development optimizations
    ...(isDev && {
      devIndicators: {
        buildActivity: true,
        buildActivityPosition: 'bottom-right',
      },
    }),

    // Webpack customization
    webpack: (config, { buildId, dev, isServer, webpack }) => {
      // Custom webpack plugins for build info
      config.plugins.push(
        new webpack.DefinePlugin({
          __BUILD_ID__: JSON.stringify(buildId),
          __DEV__: JSON.stringify(dev),
        })
      )

      return config
    },

    // Headers for security and performance
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
          ],
        },
        {
          source: '/api/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, no-cache, must-revalidate',
            },
          ],
        },
        {
          source: '/_next/static/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ]
    },

    // Redirects for SEO and UX
    async redirects() {
      return [
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
        {
          source: '/dashboard',
          destination: '/',
          permanent: true,
        },
      ]
    },

    // Rewrites for clean URLs
    async rewrites() {
      return [
        {
          source: '/sports/:league',
          destination: '/sports?league=:league',
        },
      ]
    },

    // Environment variables
    env: {
      BUILD_TIME: new Date().toISOString(),
      APP_VERSION: process.env.npm_package_version || '1.0.0',
    },

    // Output configuration for deployment
    output: 'standalone',
    
    // Trailing slash configuration
    trailingSlash: false,

    // React Strict Mode
    reactStrictMode: true,

    // Logging configuration
    logging: {
      fetches: {
        fullUrl: isDev,
      },
    },

    // Page extensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

    // Bundle analyzer (only in analyze mode)
    ...(process.env.ANALYZE === 'true' && {
      webpack: (config, options) => {
        const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')()
        config.plugins.push(new BundleAnalyzerPlugin())
        return config
      },
    }),
  }

  return config
}

export default nextConfig