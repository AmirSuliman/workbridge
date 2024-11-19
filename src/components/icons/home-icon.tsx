import { IconProps } from '@/types/common';
import React from 'react';

const HomeIcon: React.FC<IconProps> = ({ classNames }) => {
  return (
    <svg
      className={classNames}
      width={20}
      height={18}
      viewBox="0 0 22 23"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0307 0.937252C10.5655 0.402426 11.4326 0.402426 11.9674 0.937252L21.554 10.5238C21.9457 10.9155 22.0628 11.5045 21.8509 12.0163C21.6389 12.528 21.1395 12.8617 20.5856 12.8617H19.2161V21.0787C19.2161 21.8351 18.6029 22.4482 17.8466 22.4482H15.1076C14.3512 22.4482 13.7381 21.8351 13.7381 21.0787V16.9702C13.7381 16.2138 13.1249 15.6007 12.3686 15.6007H9.62955C8.87319 15.6007 8.26004 16.2138 8.26004 16.9702V21.0787C8.26004 21.8351 7.64689 22.4482 6.89054 22.4482H4.15153C3.39517 22.4482 2.78202 21.8351 2.78202 21.0787V12.8617H1.41251C0.858601 12.8617 0.35923 12.528 0.147256 12.0163C-0.0647172 11.5045 0.0524518 10.9155 0.444128 10.5238L10.0307 0.937252Z"
      ></path>
    </svg>
  );
};

export default HomeIcon;
