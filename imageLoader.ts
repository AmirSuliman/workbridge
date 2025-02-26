export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: any;
  width: any;
  quality?: any;
}) {
  // For external URLs (like S3), return the source directly
  if (src.startsWith('http')) {
    return src;
  }
  // For local images, use Next.js image optimization
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${
    quality || 75
  }`;
}
