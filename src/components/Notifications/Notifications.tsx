import { API_ROUTES } from '@/constants/apiRoutes';
import {
  addNotification,
  fetchNotificationsData,
} from '@/store/slices/notificationsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import NotificationDropdown from './NotificationDropdown';
import NotificationsButton from './NotificationsButton';
import { RootState } from '@/store/store';

const Notifications = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.myInfo);
  let accessToken;
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
  }
  useEffect(() => {
    if (!accessToken || !user?.user?.employeeId) {
      return;
    }
    const connection = io(API_ROUTES.WEBSOCKET_URL, {
      auth: { token: accessToken },
      transports: ['websocket'],
    });

    connection.emit('joinRoom', user?.user?.employeeId);
    connection.on('notification', (notification) => {
      if (
        notification.type !== 'system' &&
        notification.data &&
        notification.data.notification
      ) {
        dispatch(addNotification(notification.data));
      }
    });

    return () => {
      connection.off('foo');
      connection.close();
    };
  }, [user?.user?.employeeId, accessToken]);

  useEffect(() => {
    dispatch(
      fetchNotificationsData({
        page: 1,
      }) as any
    );
  }, []);

  return (
    <>
      <NotificationsButton />
      <NotificationDropdown />
    </>
  );
};

export default Notifications;
