import axiosInstance from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

// Define the error type
interface ErrorResponse {
  message: string;
}

// Async thunk for posting the interview
export const scheduleInterview = createAsyncThunk<
  any, // Success response type
  { id: number; data: { type: string; date: string } }, // Argument type
  { rejectValue: ErrorResponse | string } // Reject type
>(
  'interview/schedule',
  async (
    { id, data }: { id: number; data: { type: string; date: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/jobApplication/${id}/interview`,
        data
      );
      return response.data; // Return response data on success
    } catch (error) {
      // Narrow down the error type for better handling
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || { message: 'Something went wrong' }
        );
      }
      return rejectWithValue({ message: 'Unexpected error occurred' });
    }
  }
);

const interviewSlice = createSlice({
  name: 'interview',
  initialState: {
    loading: false,
    error: null as ErrorResponse | string | null,
    success: false,
  },
  reducers: {
    resetInterviewState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scheduleInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(scheduleInterview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(scheduleInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

export const { resetInterviewState } = interviewSlice.actions;

export default interviewSlice.reducer;
