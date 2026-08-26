import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/',
        permanent: true,
      },
      {
        source: '/shop/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product/:path*',
        destination: '/for-sale',
        permanent: true,
      },
      {
        source: '/product-category/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product-tag/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/test-page-for-franchise-marketplace/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/franchise-marketplace',
        destination: '/',
        permanent: true,
      },
      {
        source: '/franchise-marketplace/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/author/franchisetechnology',
        destination: '/editors',
        permanent: true,
      },
      {
        source: '/author/franchisetechnology/:path*',
        destination: '/editors',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/',
        permanent: true,
      },
      {
        source: '/privacy/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

