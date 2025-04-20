import toast from 'react-hot-toast';
import { API_ROUTES } from '../constants/apiRoutes';
import axiosInstance from '../lib/axios';

interface FetchUsersParams {
  page: number;
  pageSize: number;
  searchQuery?: string;
  filter: string;
}

export const fetchUsers = async ({
  page = 1,
  pageSize = 10,
  searchQuery = '',
  filter = '',
}: Partial<FetchUsersParams>) => {
  try {
    const response = await axiosInstance.get(API_ROUTES.GET_USERS, {
      params: {
        page,
        size: pageSize,
        firstName: searchQuery,
        roleId: filter,
      },
    });
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message ?? 'Network Error');
    throw error;
  }
};

export const addUser = async (user: { isManager?: boolean } & object) => {
  try {
    const payload = {
      ...user,
      isManager: Boolean(user.isManager), 
    };

    console.log("Final API Payload:", payload);

    const response = await axiosInstance.post(API_ROUTES.CREATE_USER, payload);
    toast.success('User created Successfully!');
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message ?? 'Network Error');
    throw error;
  }
};


