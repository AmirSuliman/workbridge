import axiosInstance from '@/lib/axios';
import axios from 'axios';
import { getSession } from 'next-auth/react';

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

export const getPoliciesById = async (page: number, size: number) => {
  try {
    const session = await getSession();
    const employeeId = session?.user?.employeeId;

    if (!employeeId) {
      throw new Error('Employee ID not found in session');
    }

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
