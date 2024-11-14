import { IconProps } from '@/src/types/common';
import React from 'react';

const CircleIcon: React.FC<IconProps> = ({ classNames }) => {
  return (
    <svg
      className={classNames}
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 0C5.87272 0 0.5 5.37272 0.5 12C0.5 18.6273 5.87272 24 12.5 24C19.1273 24 24.5 18.6273 24.5 12C24.5 5.37272 19.1273 0 12.5 0ZM12.5 22C6.97728 22 2.50002 17.5227 2.50002 12C2.50002 6.47728 6.97728 2.00002 12.5 2.00002C18.0227 2.00002 22.5 6.47728 22.5 12C22.5 17.5227 18.0227 22 12.5 22Z"
        fill="#0F172A"
      />
    </svg>
  );
};

export default CircleIcon;
