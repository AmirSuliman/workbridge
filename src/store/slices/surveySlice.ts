import axiosInstance from '@/lib/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSurveys = createAsyncThunk(
  'surveys/fetchSurveys',
  async ({
    currentPage,
    pageSize,
  }: {
    currentPage: number;
    pageSize: number;
  }) => {
    const response = await axiosInstance.get('/surveys', {
      params: {
        page: currentPage,
        size: pageSize,
        associations: true,
      },
    });
    return response.data;
  }
);

const surveySlice = createSlice({
  name: 'surveys',
  initialState: {
    data: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchSurveys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default surveySlice.reducer;
