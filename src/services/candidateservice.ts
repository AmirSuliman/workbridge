import axiosInstance from '../lib/axios';
import { API_ROUTES } from '../constants/apiRoutes';
import toast from 'react-hot-toast';

export const fetchCandidates = async (
  token: string | undefined,
  page: number = 1,
  pageSize: number = 10,
  searchQuery: string = '',
  sortBy: string | null = null,
  sortOrder: 'asc' | 'desc' | null = null,
  filter: string | null = null
): Promise<any> => {
  if (!token) {
    throw new Error('Authorization token is required.');
  }

  try {
    const response = await axiosInstance.get(API_ROUTES.Candidate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size: pageSize,
        searchQuery,
        sortBy,
        sortOrder,
        filter,
      },
    });
console.log(response, 'res');
    return response.data;  // Return the fetched candidates data
  } catch (error: any) {
    const statusCode = error.response?.status;
    const message = error.response?.data?.message || 'An error occurred.';

    // Handle specific error cases
    switch (statusCode) {
      case 400:
        console.error('Bad Request:', message);
        toast.error('Invalid request. Please check your input.');
        throw new Error('Invalid request. Please check your input.');
      case 401:
        console.error('Unauthorized:', message);
        toast.error('Unauthorized. Please log in again.');
        throw new Error('Unauthorized. Please log in again.');
      case 403:
        console.error('Forbidden:', message);
        toast.error('Access denied. You do not have permission.');
        throw new Error('Access denied. You do not have permission.');
      case 404:
        console.error('Not Found:', message);
        toast.error('Requested resource not found.');
        throw new Error('Resource not found.');
      case 500:
        console.error('Internal Server Error:', message);
        toast.error('Server error. Please try again later.');
        throw new Error('Server error. Please try again later.');
      default:
        console.error(`Unhandled error (${statusCode}):`, message);
        toast.error(message || 'Something went wrong. Please try again.');
        throw new Error(message || 'Something went wrong. Please try again.');
    }
  }
};
