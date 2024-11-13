import axiosInstance from "@/src/lib/axios";
import { API_ROUTES } from "@/src/constants/apiRoutes";
import toast from "react-hot-toast";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.LOGIN, { email, password });
        toast.success('Login Successful');
        alert('Login Successful');
        return response.data;

    } catch (error: any) {
        console.log(error, "error")
        toast.error(error.message ?? "Login Failed");
        throw error;
    }
};

