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
      <Notifications />
      <UserProfileInfo />
    </header>
  );
};
export default UserHeader;
