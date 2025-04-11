'use client';
import { EventTypes } from '@/types/events';
import eventEmitter from '@/utils/eventEmitter';
import { TiThMenu } from 'react-icons/ti';
import Notifications from '../Notifications/Notifications';
import UserProfileInfo from '../UserProfileInfo';
const UserHeader = () => {
  const toggleSidebar = () => {
    eventEmitter.emit(EventTypes.Toggle_Navbar, { message: 'toggleSidebar' });
  };
  return (
    <header className='gap-4 bg-white border-0 border-b-[1px] border-gray-border flex items-center py-2 px-3'>
      <TiThMenu className=' h-5 w-8 sm:hidden' onClick={toggleSidebar} />
      <div className='flex justify-between items-center mr-0 ml-auto gap-4'>
        <Notifications />
        <div className='flex-1 flex justify-end sm:justify-end md:justify-start lg:justify-start'>
          <UserProfileInfo />
        </div>
      </div>
    </header>
  );
};
export default UserHeader;
