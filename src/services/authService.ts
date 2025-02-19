import axiosInstance from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';
import toast from 'react-hot-toast';

export const loginUser = async ({
  email,
  password,
  onSuccess,
}: {
  email: string;
  password: string;
  onSuccess?: any;
}) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.LOGIN, {
      email,
      password,
    });
    onSuccess?.();
    toast.success('Login Successful');
    // alert('Login Successful');
    return response.data;
  } catch (error: any) {
    console.log(error, 'error');
    toast.error(error?.response?.data?.message ?? 'Network Error');
    throw error;
  }
};

export const getUserRoles = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.USER_ROLES);
    // console.log(response, 'res of roles');
    return response.data.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message ?? 'Network Error');
    throw error;
  }
};
