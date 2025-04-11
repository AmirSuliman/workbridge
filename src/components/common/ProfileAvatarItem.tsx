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
    <div className='flex items-center p-0 gap-2'>
      <Image
        src={imgSrc}
        alt={alt}
        width={400}
        height={400}
        className='size-8 lg:size-10 rounded-full'
        onError={() => {
          setImgSrc(IMAGES.placeholderAvatar);
        }}
      />
      <div className='text-left'>
        <h4 className='text-xs lg:text-sm font-[500] text-dark-navy '>
          {title}
        </h4>
        <p className='text-[8px] lg:text-xs font-[500] text-dark-navy'>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ProfileAvatarItem;
