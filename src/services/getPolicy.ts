import axiosInstance from '@/lib/axios';
import { getSession } from 'next-auth/react';

export const getPolicy = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/policy/${id}`
    );
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Policy error:', error);
    return { data: null, error: error };
  }
};

export const getPolicybyIdempId = async (id) => {

  try {
    const session = await getSession(); 
        console.log(session, 'session');
        const employeeId = session?.user?.employeeId; 
    const response = await axiosInstance.get(
      `/policy/${id}/employee/${employeeId}`
     
    );
console.log(response, 'res');
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Policy error:', error);
    return { data: null, error: error };
  }
};

