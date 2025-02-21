import { NotificationItem } from '@/types/notifications';
import NotificationIcon from './NotificationIcon';
import NotificationLink from './NotificationLink';
import NotificationDelete from './NotificationDelete';

interface Props {
  notification: NotificationItem;
}

const NotificationListItem = ({ notification }: Props) => {
  const seenClass = notification.seen ? '' : 'bg-gray-200 ';

  return (
    <NotificationLink notification={notification}>
      <div
        className={
          seenClass +
          'group relative px-1 py-3 w-full min-h-[80px] shrink-0 flex flex-row justify-between items-center shadow-sm rounded-md border-[1px] border-[#E8E8E8]'
        }
      >
        <div className="flex w-[70px] h-[100%] items-center justify-center flex-shrink-0">
          <NotificationIcon type={notification.notification?.notificationType} />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="font-bold text-[14px]">
            {notification.notification?.name}
          </div>
          <div
            className="text-[12px]"
            dangerouslySetInnerHTML={{
              __html: notification.notification?.description,
            }}
          ></div>
        </div>

        <NotificationDelete notification={notification} />
      </div>
    </NotificationLink>
  );
};

export default NotificationListItem;
