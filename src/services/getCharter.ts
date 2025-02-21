// /charter?flat=true

import axiosInstance from '@/lib/axios';

export const getCharter = async () => {
  try {
    const response = await axiosInstance.get(`/charter?flat=true`);
    return { data: response.data, error: null };
  } catch (error) {
    console.error('chart error:', error);
    return { data: null, error: error };
  }
};
