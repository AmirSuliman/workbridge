// ProfileInfoItem.tsx

import React from 'react';
import { IconType } from 'react-icons'; // Adjust if you're using specific icons

interface ProfileInfoItemProps {
    title: string;
    icon: IconType;
    text: string;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ title, icon: Icon, text }) => (
    <div className="">
        <h3 className='text-gray-500 text-[10px]'>{title}</h3>
        <div className='flex items-center'>
            <Icon className="max-w-3 mr-1 text-left text-gray-500 " />
            <p className='text-dark-navy text-[12px] whitespace-nowrap'>{text}</p>
        </div>
    </div>
);

export default ProfileInfoItem;
