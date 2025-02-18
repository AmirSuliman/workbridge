import {
  fetchNotificationsData,
  notificationsLoadingSelector,
} from '@/store/slices/notificationsSlice';
import { RootState } from '@/store/store';
import { useCallback } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

const NotificationsShowMore = () => {
  const loading = useSelector(notificationsLoadingSelector);
  const page = useSelector(
    (state: RootState) => state.notifications.currentPage
  );
  const hasmore = useSelector(
    (state: RootState) => state.notifications.hasMore
  );
  const dispatch = useDispatch();

  const _handleShowMore = useCallback(() => {
    dispatch(
      fetchNotificationsData({
        page: page + 1,
      }) as any
    );
  }, []);

  if (loading) {
    return <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />;
  }

  if (!hasmore) {
    return <div className="text-center">All notifications loaded</div>;
  }
  return (
    <div className="text-center">
      <button disabled={!hasmore} onClick={_handleShowMore}>
        See more
      </button>
    </div>
  );
};

export default NotificationsShowMore;
