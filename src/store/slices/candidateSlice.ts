// store/candidateSlice.js
import axiosInstance from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch candidate data
export const fetchCandidateData = createAsyncThunk(
  'candidate/fetchCandidateData',
  async (candidateId: string | string[], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `candidate/${candidateId}?associations=true`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
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
        state.error = action.payload;
      });
  },
});

export default candidateSlice.reducer;
