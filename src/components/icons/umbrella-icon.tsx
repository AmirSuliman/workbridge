import { IconProps } from '@/types/common';
import React from 'react';

const UmbrellaIcon: React.FC<IconProps> = ({ classNames }) => {
  return (
    <svg
      className={classNames}
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9762 13.6142C18.3908 3.61274 13.9716 0.173606 5.00007 7.53273M6.62403 11.8166L1.02697 17.4014M14.6249 17.3272C16.2739 15.5588 17.1766 13.2222 17.1449 10.8044C17.1133 8.38672 16.1496 6.07453 14.4548 4.34994C12.7601 2.62536 10.4651 1.62147 8.04828 1.5476C5.63149 1.47372 3.27944 2.33555 1.48252 3.95341L14.6249 17.3272Z"
        stroke="currentColor"
        strokeWidth="1.20984"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UmbrellaIcon;
