import axiosInstance from '@/lib/axios';
import axios from 'axios';

export const getPolicyResponse = async (id) => {
  try {
    const response = await axiosInstance.get(`policy/${id}/responses`);
    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, error: error };
    }
    console.error('Policy error:', error);
    return { data: null, error: error };
  }
};
