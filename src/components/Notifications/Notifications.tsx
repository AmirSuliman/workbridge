import { useEffect } from 'react';
import NotificationDropdown from './NotificationDropdown';
import NotificationsButton from './NotificationsButton';
import { useDispatch } from 'react-redux';
import {
  addNotification,
  fetchNotificationsData,
} from '@/store/slices/notificationsSlice';
import { io } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { API_ROUTES } from '@/constants/apiRoutes';

const Notifications = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.accessToken || !session.user.userId) {
      return;
    }
    const connection = io(API_ROUTES.WEBSOCKET_URL, {
      auth: { token: session.accessToken },
      transports: ['websocket'],
    });

    connection.emit('joinRoom', session.user.userId);
    connection.on('notification', (notification) => {
      if (notification.type !== 'system' && notification.data && notification.data.notification) {
        dispatch(addNotification(notification.data));
      }
    });

    return () => {
      connection.off('foo');
      connection.close();
    };
  }, [session?.user.userId, session?.accessToken]);

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