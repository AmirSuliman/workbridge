import axiosInstance from '@/lib/axios';
import axios from 'axios';

export const getAllPolicies = async (page: number, size: number) => {
  try {
    const response = await axiosInstance.get('policies', {
      params: { page: page, size: size, associations: true },
    });
    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, error: error };
    }
    console.error('Policy error:', error);
    return { data: null, error: error };
  }
};

export const getPoliciesById = async (
  page: number,
  size: number,
  employeeId: number | undefined
) => {
  try {
    const response = await axiosInstance.get(
      `policies/employee/${employeeId}`,
      {
        params: { page, size, associations: true },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, error };
    }
    console.error('Policy error:', error);
    return { data: null, error };
  }
};
