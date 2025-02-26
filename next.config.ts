import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { 
    domains: ['i.pravatar.cc', 'www.google.com', 'wb-uploads.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wb-uploads.s3.amazonaws.com',
        pathname: '/public/**',
      },
    ],
    unoptimized: true, // Consider this option for simple deployment
  },
  eslint: { 
    ignoreDuringBuilds: true, 
  },
};




export default nextConfig;
