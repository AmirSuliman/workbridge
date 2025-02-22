import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['i.pravatar.cc', 'www.google.com', 'wb-uploads.s3.amazonaws.com'],
  },
  // typescript:{
  //   ignoreBuildErrors: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // eslint:{ignoreDuringBuilds:true}

 // webpck:(config)=>{
   // config.resolve.alias.canvas= false;
    //return config;
  //},

  // Add these configurations for NextAuth with reverse proxy
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Forwarded-Proto',
            value: 'https',
          },
        ],
      },
    ];
  },

  // Optional: Add this if you're having issues with the proxy
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
  
};




export default nextConfig;
