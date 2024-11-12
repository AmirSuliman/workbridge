import axiosInstance from "@/src/lib/axios";
import { API_ROUTES } from "@/src/constants/apiRoutes";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.LOGIN, { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

