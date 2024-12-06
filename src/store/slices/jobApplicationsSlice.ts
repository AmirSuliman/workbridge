import { API_ROUTES } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios';
import { JobApplicationsState } from '@/types/next-auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface FetchParams {
  stage?: string;
  sort?: string;
  page: number;
  size: number;
  candidateId?: string | string[] | undefined;
  jobId?: string | string[] | undefined;
}

export const fetchJobApplications = createAsyncThunk<
  JobApplicationsState, // Type of the fulfilled value
  FetchParams, // Type of the input parameters
  { rejectValue: string } // Type of the rejected value
>(
  'jobApplications/fetchJobApplications',
  async (params: FetchParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ROUTES.GET_jOB_APPLICATIONS,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        'Failed to fetch data';
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state using the defined interface
const initialState: JobApplicationsState = {
  data: null,
  loading: false,
  error: null,
};

const jobApplicationsSlice = createSlice({
  name: 'jobApplications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchJobApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export default jobApplicationsSlice.reducer;
