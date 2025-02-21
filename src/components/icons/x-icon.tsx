import { IconProps } from '@/types/common';
import React from 'react';

const XIcon: React.FC<IconProps> = ({ classNames }) => {
  return (
    <svg
      className={classNames}
      width={11}
      height={12}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25196 6.61094L0.837183 11.4618H1.87438L4.74663 7.40879L7.28378 11.4618H10.523L6.45402 4.96738L9.90072 0.0686035H8.86351L5.97531 4.18549L3.40625 0.0686035H0.166992L4.25196 6.61094ZM2.9435 0.914321L9.00713 10.6161H7.74653L1.6829 0.914321H2.9435Z"
        fill="white"
      />
    </svg>
  );
};

export default XIcon;
