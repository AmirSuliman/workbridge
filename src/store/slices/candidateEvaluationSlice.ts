import axiosInstance from '@/lib/axios';
import { CandidateEvaluation } from '@/types/candidateEvaluation';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const fetchAiReviewData = createAsyncThunk<
  CandidateEvaluation[],
  string | string[],
  { rejectValue: string }
>(
  'aiReview/fetchAiReviewData',
  async (jobId: string | string[], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/aireviews/jobappliation/${jobId}`
      );
      return response.data as CandidateEvaluation[];
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

interface AiReviewState {
  data: CandidateEvaluation[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: AiReviewState = {
  data: null,
  loading: false,
  error: null,
};

const aiReviewSlice = createSlice({
  name: 'aiReview',
  initialState,
  reducers: {
    clearAiReviewData: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAiReviewData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAiReviewData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAiReviewData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearAiReviewData } = aiReviewSlice.actions;

export default aiReviewSlice.reducer;
