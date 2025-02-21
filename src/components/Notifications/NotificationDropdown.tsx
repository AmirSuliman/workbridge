import {
  notificationDropdownSelector,
  notificationsSelector,
} from '@/store/slices/notificationsSlice';
import { useSelector } from 'react-redux';
import NotificationItem from './NotificationListItem';
import NotificationsShowMore from './NotificationsShowMore';

const NotificationDropdown = () => {
  const isOpen = useSelector(notificationDropdownSelector);
  const notifcations = useSelector(notificationsSelector);

  if (!isOpen) {
    return null;
  }

  return (
    <nav className="block border-[1px] absolute right-[12vw] top-[75px] z-10 rounded-md shadow-lg bg-white pb-2">
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
