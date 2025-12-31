/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from CMS providers and other sources
  // Add domains for your CMS provider (Ghost, Contentful, Sanity, etc.)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ghost.io',
      },
      {
        protocol: 'https',
        hostname: '**.ghost.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Add your custom Ghost domain if self-hosted
      // {
      //   protocol: 'https',
      //   hostname: 'your-ghost-domain.com',
      // },
      // Add your custom image hosting/CDN domains here
      // Examples:
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.yourdomain.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: '**.cloudinary.com',  // Wildcard for subdomains
      // },
      // {
      //   protocol: 'https',
      //   hostname: '**.imgix.net',
      // },
    ],
  },
}

module.exports = nextConfig
