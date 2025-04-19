import axiosInstance from '@/lib/axios';

export const fetchUserData = async (accessToken: string) => {
  try {
    const response = await axiosInstance.get('/user/my', {
      headers: { Authorization: `${accessToken}` },
    });
    return response.data.data; // Return only the user data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user data'
    );
  }
};
