import { deleteNotification } from '@/store/slices/notificationsSlice';
import { NotificationItem } from '@/types/notifications';
import { useState } from 'react';
import { HiTrash, HiX } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

interface Props {
  notification: NotificationItem;
}

const NotificationDelete = ({ notification }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  if (isDeleting) {
    const _handleCancelDelete = (event) => {
      setIsDeleting(false);
      event.stopPropagation();
      event.preventDefault();
    };
    const _handleConfirmDelete = (event) => {
      dispatch(deleteNotification({ id: notification.id }) as any);
      event.stopPropagation();
      event.preventDefault();
    };
    return (
      <div
        className="flex-col absolute align-middle bg-white bg-opacity-90 flex h-full items-center justify-center left-0 top-0 w-full"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
      >
        <div>Confirm Delete?</div>
        <div className="flex gap-3">
          <button
            onClick={_handleConfirmDelete}
            className="bg-red-200 flex flex-row gap-2 items-center p-1 rounded-md text-red-400"
          >
            <HiTrash />
            <span>Delete</span>
          </button>
          <button
            onClick={_handleCancelDelete}
            className="bg-opacity-75 bg-white border-[1px] flex items-center p-1 rounded-md text-blue-700"
          >
            <HiX />
            <span>cancel</span>
          </button>
        </div>
      </div>
    );
  }

  const _handleDelete = (event) => {
    setIsDeleting(true);
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <div className="flex top-[4px] absolute right-[4px] opacity-0 touch-none group-hover:opacity-100 group-hover:touch-auto transition-opacity duration-300 group-hover:delay-300">
      <button
        className="bg-white p-1 bg-opacity-75 rounded-md text-red-400"
        onClick={_handleDelete}
      >
        <HiTrash />
      </button>
    </div>
  );
};

export default NotificationDelete;
