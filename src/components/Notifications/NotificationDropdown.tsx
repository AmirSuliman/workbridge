import {
  notificationDropdownSelector,
  notificationsSelector,
  toggleDropdown,
} from '@/store/slices/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import NotificationItem from './NotificationListItem';
import NotificationsShowMore from './NotificationsShowMore';
import { useEffect, useRef } from 'react';

const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(notificationDropdownSelector);
  const notifcations = useSelector(notificationsSelector);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleDropdown(null));
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) {
    return null;
  }

  return (
    <nav
      ref={dropdownRef}
      className="block border-[1px] absolute right-[12vw] top-[75px] z-10 rounded-md shadow-lg bg-white pb-2"
    >
      <div
        style={{
          scrollbarWidth: 'thin',
        }}
        className="flex gap-1 flex-col h-auto overflow-y-auto w-[320px] max-h-[460px] scrollbar-thin pt-2 pb-2 px-[8px]"
      >
        {notifcations.map((notification, index) => {
          if (notification.notification?.deleted) {
            return null;
          }
          return <NotificationItem key={index} notification={notification} />;
        })}
      </div>
      <NotificationsShowMore />
    </nav>
  );
};

export default NotificationDropdown;
