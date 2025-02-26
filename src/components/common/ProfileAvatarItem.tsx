import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/constants/images';
import imageLoader from '../../../imageLoader';
interface ProfileAvatarItemProps {
  src: string;
  title: string;
  subtitle?: string;
  alt?: string;
}

const ProfileAvatarItem: React.FC<ProfileAvatarItemProps> = ({
  alt = 'avatar',
  src,
  subtitle = '-',
  title,
}) => {
  const [imgSrc, setImgSrc] = useState(src || IMAGES.placeholderAvatar);

  useEffect(() => {
    setImgSrc(src || IMAGES.placeholderAvatar);
  }, [src]);

  return (
    <div className="flex  items-center p-0 gap-2">
      <Image
        src={imgSrc}
        alt={alt}
        width={500}
        height={500}
        className="size-12 rounded-full"
        onError={() => {
          setImgSrc(IMAGES.placeholderAvatar);
        }}
      />
      <div className="ml-2 text-left">
        <h4 className="text-sm font-[500] text-dark-navy whitespace-nowrap">
          {title}
        </h4>
        <p className="text-xs  font-[500] text-dark-navy">{subtitle}</p>
      </div>
    </div>
  );
};

export default ProfileAvatarItem;
