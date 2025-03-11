import axiosInstance from '@/lib/axios';

export const fetchUserData = async (accessToken: string) => {
  try {
    const response = await axiosInstance.get('/user/my', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data; // Return only the user data
  } catch (error: any) {
    console.log('Error fetching user data:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user data'
    );
  }
};
