import axiosInstance from '@/lib/axios';

export const getPolicy = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/policy/${id}`
      //   , {
      //   params: { associations: true },
      // }
    );
    return { data: response.data, error: null };
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   toast.error(error.response?.data.message || 'An error occured.');
    // }
    console.error('Policy error:', error);
    return { data: null, error: error };
  }
};
