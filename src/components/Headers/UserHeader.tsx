'use client';
import { EventTypes } from '@/types/events';
import eventEmitter from '@/utils/eventEmitter';
import { GoBell } from 'react-icons/go';
import { TiThMenu } from 'react-icons/ti';
import UserProfileInfo from '../UserProfileInfo';
import Notifications from '../Notifications/Notifications';
const UserHeader = () => {
  const toggleSidebar = () => {
    eventEmitter.emit(EventTypes.Toggle_Navbar, { message: 'toggleSidebar' });
  };
  return (
    <header className="gap-4 bg-white border-0 border-b-[1px] border-gray-border flex items-center py-2 px-3">
      <TiThMenu className=" ms h-5 w-8 sm:hidden" onClick={toggleSidebar} />
      <div className="flex justify-between items-center">
        <Notifications />
        <div className="flex-1 flex justify-end sm:justify-end md:justify-start lg:justify-start">
          <UserProfileInfo />
        </div>
      </div>
    </header>
  );
};
export default UserHeader;
