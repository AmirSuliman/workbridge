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
};

export default nextConfig;
