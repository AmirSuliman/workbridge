// store/candidateSlice.js
import axiosInstance from '@/lib/axios';
import { EmployeeData } from '@/types/employee';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const fetchCandidateData = createAsyncThunk<
  EmployeeData,
  string | string[],
  { rejectValue: string }
>(
  'candidate/fetchCandidateData',
  async (candidateId: string | string[], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `candidate/${candidateId}?associations=true`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

interface CandidateState {
  data: EmployeeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  data: null,
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidateData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCandidateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export default candidateSlice.reducer;
