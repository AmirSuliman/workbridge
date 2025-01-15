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
};

export default nextConfig;
