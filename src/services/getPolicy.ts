import axiosInstance from '@/lib/axios';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export const getPolicy = async (id) => {
  try {
    const response = await axiosInstance.get(`/policy/${id}`, {
      params: { associations: true },
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Policy error:', error);
    return { data: null, error };
  }
};

export const getPolicybyIdempId = async (id) => {
  try {
    const user = useSelector((state: RootState) => state.myInfo);
    const employeeId = user?.user?.employeeId;
    // const employeeId = session?.user?.employeeId;

    if (!employeeId) {
      throw new Error('Employee ID not found in session');
    }

    const response = await axiosInstance.get(
      `/policy/${id}/employee/${employeeId}`,
      {
        params: { associations: true },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    console.error('Policy error:', error);
    return { data: null, error };
  }
};
