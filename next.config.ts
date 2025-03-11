import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['wb-uploads.s3.amazonaws.com', 'www.google.com'],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
