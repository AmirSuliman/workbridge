import { API_ROUTES } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { RootState } from '../store';
import { NotificationItem, NotificationsResponse } from '@/types/notifications';

// Define the error type
export interface NotifcationsState {
  loading: boolean;
  error: ErrorResponse | string | null;
  success: boolean;
  notifications: NotificationItem[];
  unreadCount: number;
  loadingCount: boolean;
  errorCount: ErrorResponse | string | null;
  dropDownState: boolean;
  hasMore: boolean;
  currentPage: number;
  readingState: {
    [id: number]: {
      pending: boolean;
      success: boolean;
    };
  };
  deletingState: {
    [id: number]: {
      pending: boolean;
      success: boolean;
    };
  };
}
interface ErrorResponse {
  message: string;
}
interface NotificationsRequest {
  page: number;
}
interface Response<T> {
  data: {
    message: string;
    data: T;
  };
}

const initialState: NotifcationsState = {
  loading: false,
  error: null,
  success: false,
  notifications: [],
  loadingCount: false,
  errorCount: null,
  unreadCount: 0,
  dropDownState: false,
  readingState: {},
  deletingState: {},
  hasMore: true,
  currentPage: 1,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationItem>) => {
      //this will be used by websocket
      state.notifications.unshift(action.payload);
      state.unreadCount++;
    },
    toggleDropdown: (state, action: PayloadAction<boolean | null>) => {
      if (action.payload !== null) {
        state.dropDownState = action.payload;
        return;
      }
      state.dropDownState = !state.dropDownState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchNotificationsData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notifications = [...state.notifications, ...action.payload.items];
        state.hasMore = state.notifications.length < action.payload.totalItems;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchNotificationsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      })

      // Unread Notifications
      .addCase(fetchNotificationsUnreadCount.pending, (state) => {
        state.loadingCount = true;
        state.errorCount = null;
      })
      .addCase(
        fetchNotificationsUnreadCount.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.unreadCount = action.payload;
          state.loadingCount = false;
          state.errorCount = null;
        }
      )
      .addCase(fetchNotificationsUnreadCount.rejected, (state, action) => {
        state.loadingCount = false;
        state.errorCount = action.payload || 'Unknown error occurred';
      })

      // Read Notification
      .addCase(markReadNotification.pending, (state, action) => {
        state.readingState[action.meta.arg.id] = {
          pending: true,
          success: false,
        };
        //optimistic change on state
        var notification = state.notifications.find(
          (n) => n.id == action.meta.arg.id
        );
        if (notification) {
          notification.seen = true;
        }
        state.unreadCount--;
      })
      .addCase(
        markReadNotification.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.readingState[action.payload] = {
            pending: false,
            success: true,
          };

          var notification = state.notifications.find(
            (n) => n.id == action.payload
          );
          if (notification) {
            notification.seen = true;
          }
        }
      )
      .addCase(markReadNotification.rejected, (state, action) => {
        state.readingState[action.meta.arg.id] = {
          pending: false,
          success: false,
        };

        var notification = state.notifications.find(
          (n) => n.id == action.meta.arg.id
        );
        if (notification) {
          notification.seen = false;
        }
        state.unreadCount++;
      })

      //Delete Notification
      .addCase(deleteNotification.pending, (state, action) => {
        state.readingState[action.meta.arg.id] = {
          pending: true,
          success: false,
        };
        //optimistic change on state
        var notification = state.notifications.find(
          (n) => n.id == action.meta.arg.id
        );
        if (notification) {
          notification.notification.deleted = true;
        }
      })
      .addCase(
        deleteNotification.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.readingState[action.payload] = {
            pending: false,
            success: true,
          };

          state.notifications = state.notifications.filter(
            (n) => n.id != action.payload
          );
        }
      )
      .addCase(deleteNotification.rejected, (state, action) => {
        state.readingState[action.meta.arg.id] = {
          pending: false,
          success: false,
        };

        var notification = state.notifications.find(
          (n) => n.id == action.meta.arg.id
        );
        if (notification) {
          //revert back
          notification.notification.deleted = false;
        }
      });
  },
});

export const { addNotification, toggleDropdown } = notificationsSlice.actions;

// Async thunk for notifications list
export const fetchNotificationsData = createAsyncThunk<
  NotificationsResponse, // Success response type
  NotificationsRequest, // Argument type
  { rejectValue: ErrorResponse | string } // Reject type
>(
  'notifications/load',
  async ({ page }: NotificationsRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ROUTES.GET_NOTIFICATIONS, {
        params: { page, size: 5 },
      });
      return response.data.data; // Return response data on success
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || { message: 'Something went wrong' }
        );
      }
      return rejectWithValue({ message: 'Unexpected error occurred' });
    }
  }
);

// Async thunk for unread notifications count
export const fetchNotificationsUnreadCount = createAsyncThunk<
  number, // Success response type
  any, // Argument type
  { rejectValue: ErrorResponse | string } // Reject type
>('notifications/unreadCount', async ({}, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<any, Response<number>>(
      `${API_ROUTES.NOTIFICATION}/unread/count`
    );
    return response.data.data; // Return response data on success
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data || { message: 'Something went wrong' }
      );
    }
    return rejectWithValue({ message: 'Unexpected error occurred' });
  }
});

// Async thunk for marking a notification as red
export const markReadNotification = createAsyncThunk<
  number, // Success response type
  { id: number }, // Argument type
  { rejectValue: number } // Reject type
>(
  'notifications/readNotification',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.put<any, Response<any>>(
        `${API_ROUTES.NOTIFICATION}/read/${id}`
      );
      await dispatch(fetchNotificationsUnreadCount({}));
      return id; // Return response data on success
    } catch (error) {
      return rejectWithValue(id);
    }
  }
);

// Async thunk for deleting notification
export const deleteNotification = createAsyncThunk<
  number, // Success response type
  { id: number }, // Argument type
  { rejectValue: number } // Reject type
>(
  'notifications/deleteNotification',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete<any, Response<any>>(
        `${API_ROUTES.NOTIFICATION}/${id}`
      );
      await dispatch(fetchNotificationsUnreadCount({}));
      return id; // Return response data on success
    } catch (error) {
      return rejectWithValue(id);
    }
  }
);

export const notificationUnreadCountSelector = (state: RootState) =>
  state.notifications.unreadCount;
export const notificationUnreadErrorSelector = (state: RootState) =>
  state.notifications.errorCount;
export const notificationUnreadPendingSelector = (state: RootState) =>
  state.notifications.loadingCount;
export const notificationDropdownSelector = (state: RootState) =>
  state.notifications.dropDownState;
export const notificationsSelector = (state: RootState) =>
  state.notifications.notifications;
export const notificationsLoadingSelector = (state: RootState) =>
  state.notifications.loading;

export default notificationsSlice.reducer;
