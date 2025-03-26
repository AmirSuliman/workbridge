import { IconProps } from '@/types/common';
import React from 'react';

const UserIcon: React.FC<IconProps> = ({ classNames }) => {
  return (
    <svg
      className={classNames}
      // width={22}
      // height={23}
      viewBox="0 0 22 23"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 11.4922C22 17.5673 17.0751 22.4922 11 22.4922C4.92487 22.4922 0 17.5673 0 11.4922C0 5.41706 4.92487 0.492188 11 0.492188C17.0751 0.492188 22 5.41706 22 11.4922ZM14.4375 8.05469C14.4375 9.95317 12.8985 11.4922 11 11.4922C9.10152 11.4922 7.5625 9.95317 7.5625 8.05469C7.5625 6.15621 9.10152 4.61719 11 4.61719C12.8985 4.61719 14.4375 6.15621 14.4375 8.05469ZM11 14.2422C8.30683 14.2422 5.91507 15.5327 4.40933 17.529C6.04324 19.3118 8.39108 20.4297 11 20.4297C13.6089 20.4297 15.9568 19.3118 17.5907 17.529C16.0849 15.5327 13.6932 14.2422 11 14.2422Z"
      />
    </svg>
  );
};

export default UserIcon;
