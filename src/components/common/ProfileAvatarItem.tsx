import React from 'react'
import Image from 'next/image'
import { IMAGES } from '@/src/constants/images';
interface ProfileAvatarItemProps {
    src: string;
    title: string;
    subtitle?: string;
    alt?: string;
}

const ProfileAvatarItem: React.FC<ProfileAvatarItemProps> = ({ alt = 'avatar', src, subtitle = '-', title }) => {
    return (
        <div className='flex  items-center p-0 gap-2'>
            <Image src={src && src !== '' ? src : IMAGES.placeholderAvatar} alt={alt} width={500} height={500} className='max-w-[2.5rem]  rounded-full object-cover' />
            <div className='ml-2'>
                <h4 className='text-sm font-[500] text-dark-navy whitespace-nowrap'>{title}</h4>
                <p className='text-xs  font-[500] text-dark-navy'>{subtitle}</p>
            </div>
        </div>
    )
}

export default ProfileAvatarItem