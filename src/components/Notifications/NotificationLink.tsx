import {
  markReadNotification,
  toggleDropdown,
} from '@/store/slices/notificationsSlice';
import { NotificationItem, NotificationType } from '@/types/notifications';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Props extends React.PropsWithChildren {
  notification: NotificationItem;
}
const NotificationLink = ({ notification, children }: Props) => {
  const dispatch = useDispatch();
  const _clickHandler = useCallback(() => {
    dispatch(toggleDropdown(false));
    if (!notification.seen) {
      dispatch(markReadNotification({ id: notification.id }) as any);
    }
  }, []);

  const [role, setRole] = useState<string>();
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  switch (notification.notification?.notificationType) {
    case NotificationType.Policy:
      return (
        <Link
          href={
            isUserPanel
              ? `/user/home/policy/${notification.notification.issueId}`
              : `/hr/home/policy/${notification.notification.issueId}`
          }
          onClick={_clickHandler}
        >
          {children}
        </Link>
      );
    case NotificationType.Announcement:
      return (
        <Link
          href={
            isUserPanel
              ? `/user/home/announcement/${notification.notification.issueId}`
              : `/hr/announcements-&-policies/announcements/${notification.notification.issueId}`
          }
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
        <Link
          href={isUserPanel ? '/user/leave-requests' : `/hr/leave-requests`}
          onClick={_clickHandler}
        >
          {children}
        </Link>
      );
    case NotificationType.Survey:
      return (
        <Link
          href={isUserPanel ? '/user/home' : `/hr/evaluation-&-reports?tab=1`}
          onClick={_clickHandler}
        >
          {children}
        </Link>
      );
    case NotificationType.NewManager:
      return (
        <Link href={isUserPanel ? '' : `/hr/admins`} onClick={_clickHandler}>
          {children}
        </Link>
      );
    case NotificationType.NewFile:
      return (
        <Link
          href={isUserPanel ? '/user/files' : `/hr/files`}
          onClick={_clickHandler}
        >
          {children}
        </Link>
      );
    //ToDo: Add links for other notification types as pages are not clear yet
    default:
      return children;
  }
};

export default NotificationLink;
