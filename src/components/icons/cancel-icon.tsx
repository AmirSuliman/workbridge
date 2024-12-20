import { IconProps } from '@/types/common';
import React from 'react';

const CancelIcon: React.FC<IconProps> = ({ classNames }) => {
  return (
    <svg
      className={classNames}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

export default CancelIcon;
