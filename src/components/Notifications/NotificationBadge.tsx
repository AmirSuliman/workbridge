import {
  fetchNotificationsUnreadCount,
  notificationUnreadCountSelector,
  notificationUnreadErrorSelector,
  notificationUnreadPendingSelector,
} from '@/store/slices/notificationsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NotificationBadge = () => {
  const dispatch = useDispatch();
  const unreadCount = useSelector(notificationUnreadCountSelector);
  const unreadPending = useSelector(notificationUnreadPendingSelector);
  const unreadError = useSelector(notificationUnreadErrorSelector);

  useEffect(() => {
    dispatch(fetchNotificationsUnreadCount({}) as any);
  }, []);

  if (unreadPending || (!unreadError && unreadCount < 1)) {
    //NOTE: don't show badge if it is still loading or if it is 0. 
    //on error we will show a Exclamation mark 
    return null;
  }

  return (
    <span className="absolute top-[-5px] right-[-8px] inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
      {unreadError ? '!' : unreadCount}
    </span>
  );
};

export default NotificationBadge;
