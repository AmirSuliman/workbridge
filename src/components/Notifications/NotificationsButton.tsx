import { GoBell } from 'react-icons/go';
import NotificationBadge from './NotificationBadge';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { toggleDropdown } from '@/store/slices/notificationsSlice';

const NotificationsButton = () => {
  const dispatch = useDispatch();

  const _clickHandler = useCallback(() => {
    dispatch(toggleDropdown(null));
  }, []);

  return (
    <button
      onClick={_clickHandler}
      className="border-[1px] border-[#E0E0E0] rounded-full flex items-center justify-center ml-auto relative size-[50px]"
    >
      <GoBell size={25} />
      <NotificationBadge />
    </button>
  );
};

export default NotificationsButton;
