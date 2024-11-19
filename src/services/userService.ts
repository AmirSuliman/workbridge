import toast from "react-hot-toast";
import { API_ROUTES } from "../constants/apiRoutes";
import axiosInstance from "../lib/axios";

interface FetchUsersParams {
    page: number;
    pageSize: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    filter: string;
}

export const fetchUsers = async ({
    page = 1,
    pageSize = 10,
    sortBy = '',
    sortOrder = 'asc',
    filter = '',
}: Partial<FetchUsersParams>) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_USERS, {
            params: { page, size: pageSize, sortBy, sortOrder, filter },
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
}