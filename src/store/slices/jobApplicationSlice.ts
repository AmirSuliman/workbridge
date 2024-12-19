import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '@/lib/axios';
import { JobApplicationsState } from '@/types/next-auth';

const initialState: JobApplicationsState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk to fetch job application details
export const fetchJobApplication = createAsyncThunk(
  'jobApplication/fetchJobApplication',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `jobApplication/${id}?associations=true`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch job application'
      );
    }
  }
);

const jobApplicationSlice = createSlice({
  name: 'jobApplication',
  initialState,
  reducers: {
    clearJobApplication(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJobApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearJobApplication } = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
