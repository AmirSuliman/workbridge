export type NotificationsResponse = {
  totalItems: number;
  items: NotificationItem[];
  totalPages: number;
  currentPage: number;
};

export type Sender = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  roleId: number;
  profilePictureUrl: string | null;
  sickleaveCounter: number | null;
  VacationCounter: number | null;
};

export type Notification = {
  id: number;
  name: string;
  description: string;
  issueId: number;
  imageUrl: string | null;
  notificationType: NotificationType;
  senderId: number;
  createdAt: string;
  sender: Sender;
  deleted?: boolean;
};

export interface NotificationItem {
  id: number;
  seen: boolean;
  userId: number;
  notificationId: number;
  notification: Notification;
}

export enum NotificationType {
  Birthday = 'Birthday',
  LeaveTime = 'Leave_Time',
  SickLeave = 'Sick_Leave',
  Evaluation = 'Evaluation',
  NewFile = 'New_File',
  Announcement = 'Announcement',
  NewManager = 'New_Manager',
  NewHire = 'New_Hire',
  System = 'System',
  Survey = 'Survey',
}
