import axiosInstance from '@/lib/axios';
import axios from 'axios';

export const getEmployeeInfo = async (
  token: string | undefined,
  id: string | string[] | undefined
) => {
  try {
    const response = await axiosInstance.get(`/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { associations: true },
    });
    console.log('get employee res:', response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Network error or no response
      if (!error.response) {
        console.error('Network error or no response received:', error);
        throw new Error(
          'Network error. Please check your internet connection.'
        );
      }

      // Server responded with a status code outside of the 2xx range
      const statusCode = error.response.status;
      const message = error.response.data?.message || 'An error occurred.';

      switch (statusCode) {
        case 400:
          console.error('Bad Request:', message);
          throw new Error('Invalid request. Please check your input.');
        case 401:
          console.error('Unauthorized:', message);
          throw new Error('Unauthorized. Please log in again.');
        case 403:
          console.error('Forbidden:', message);
          throw new Error('Access denied. You do not have permission.');
        case 404:
          console.error('Not Found:', message);
          throw new Error('Employee not found.');
        case 500:
          console.error('Internal Server Error:', message);
          throw new Error('Server error. Please try again later.');
        default:
          console.error(`Unhandled error (${statusCode}):`, message);
          throw new Error(message || 'Something went wrong. Please try again.');
      }
    } else {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error. Please try again later.');
    }
  }
};
