'use client';
import React from 'react';
import { GoBell } from 'react-icons/go';
import { TiThMenu } from 'react-icons/ti';
import { FaAngleDown } from 'react-icons/fa';
import Image from 'next/image';
import eventEmitter from '@/utils/eventEmitter';
import { EventTypes } from '@/types/events';
import UserProfileInfo from '../UserProfileInfo';
const UserHeader = () => {
  const toggleSidebar = () => {
    eventEmitter.emit(EventTypes.Toggle_Navbar, { message: 'toggleSidebar' });
  };
  return (
    <header className=" bg-white border-0 border-b-[1px] border-gray-border flex items-center py-2 px-3">
      <TiThMenu className=" ms h-5 w-8 sm:hidden" onClick={toggleSidebar} />

      <button className="border-[1px] border-[#E0E0E0] rounded-full size-8 mr-3 flex items-center justify-center ml-auto ">
        <GoBell size={18} />
      </button>

      <button className="flex flex-nowrap gap-4 justify-end items-center mr-0">
       
             <UserProfileInfo />

      </button>
    </header>
  );
};
export default UserHeader;
