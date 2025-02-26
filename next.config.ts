// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['i.pravatar.cc', 'www.google.com', 'wb-uploads.s3.amazonaws.com'],
//   },
//   // typescript:{
//   //   ignoreBuildErrors: true,
//   // },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },

// };




// export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.pravatar.cc', 'www.google.com', 'wb-uploads.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wb-uploads.s3.amazonaws.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
