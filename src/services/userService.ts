import toast from 'react-hot-toast';
import { API_ROUTES } from '../constants/apiRoutes';
import axiosInstance from '../lib/axios';

interface FetchUsersParams {
  page: number;
  pageSize: number;
  searchQuery?: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  filter: string;
}

export const fetchUsers = async ({
  page = 1,
  pageSize = 10,
  searchQuery = '',
  sortBy = '',
  sortOrder = 'asc',
  filter = '',
}: Partial<FetchUsersParams>) => {
  try {
    const response = await axiosInstance.get(API_ROUTES.GET_USERS, {
      params: {
        page,
        size: pageSize,
        searchQuery: searchQuery,
        sortBy,
        sortOrder,
        filter,
      },
    });
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message ?? 'Network Error');
    throw error;
  }
};

export const addUser = async (user: object) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.CREATE_USER, user);
    toast.success('User created Successfully!');
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message ?? 'Network Error');
    throw error;
  }
};
