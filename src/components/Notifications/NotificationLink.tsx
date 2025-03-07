import {
  markReadNotification,
  toggleDropdown,
} from '@/store/slices/notificationsSlice';
import { NotificationItem, NotificationType } from '@/types/notifications';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface Props extends React.PropsWithChildren {
  notification: NotificationItem;
}
const NotificationLink = ({ notification, children }: Props) => {
  // console.log('NotificationType', NotificationType);
  const dispatch = useDispatch();
  const _clickHandler = useCallback(() => {
    dispatch(toggleDropdown(false));
    if (!notification.seen) {
      dispatch(markReadNotification({ id: notification.id }) as any);
    }
  }, []);

  // console.log(
  //   'notification.notification.issueId:',
  //   notification.notification.issueId
  // );
  switch (notification.notification?.notificationType) {
    case NotificationType.Announcement:
      return (
        <Link
          href={`/hr/announcements-&-policies/announcements/${notification.notification.issueId}`}
          onClick={_clickHandler}
        >
          {children}
        </Link>
      );
    case NotificationType.NewHire:
      return (
        <Link
          href={`/hr/hiring/job/candidate/${notification.notification.issueId}`}
          onClick={_clickHandler}
        >
          {children}
        </Link>
      );
    case NotificationType.Evaluation:
      return (
        <Link
          href={`/hr/evaluation-&-reports/evaluation/${notification.notification.issueId}`}
          onClick={_clickHandler}
        >
          {children}
        </Link>
      );
    case NotificationType.LeaveTime:
    case NotificationType.SickLeave:
      return (
        <Link href={`/hr/leave-requests`} onClick={_clickHandler}>
          {children}
        </Link>
      );
    case NotificationType.NewManager:
      return (
        <Link href={`/hr/admins`} onClick={_clickHandler}>
          {children}
        </Link>
      );
    //ToDo: Add links for other notification types as pages are not clear yet
    default:
      return children;
  }
};

export default NotificationLink;
