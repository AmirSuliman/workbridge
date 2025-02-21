import { IconProps } from '@/types/common';
import React from 'react';

const LinkedinIcon: React.FC<IconProps> = ({ classNames }) => {
  return (
    <svg
      className={classNames}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3452 0.765259C4.82178 0.765259 0.345215 5.24182 0.345215 10.7653C0.345215 16.2887 4.82178 20.7653 10.3452 20.7653C15.8687 20.7653 20.3452 16.2887 20.3452 10.7653C20.3452 5.24182 15.8687 0.765259 10.3452 0.765259ZM7.54834 14.9489H5.59912V8.71057H7.54834V14.9489ZM6.521 7.92932H6.50537C5.79834 7.92932 5.34131 7.45276 5.34131 6.84729C5.34131 6.2301 5.81396 5.76526 6.53271 5.76526C7.25146 5.76526 7.69287 6.2301 7.7085 6.84729C7.7124 7.44885 7.25537 7.92932 6.521 7.92932ZM15.3452 14.9489H13.1343V11.7223C13.1343 10.8785 12.7905 10.3004 12.0288 10.3004C11.4468 10.3004 11.1226 10.691 10.9741 11.066C10.9194 11.1989 10.9272 11.3864 10.9272 11.5778V14.9489H8.73584C8.73584 14.9489 8.76318 9.2301 8.73584 8.71057H10.9272V9.69104C11.0562 9.26135 11.7554 8.65198 12.8726 8.65198C14.2593 8.65198 15.3452 9.55041 15.3452 11.4801V14.9489Z"
        fill="#0F172A"
      />
    </svg>
  );
};

export default LinkedinIcon;
