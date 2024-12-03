import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';
import axios from 'axios';
import { AllEmployeeData } from '@/types/employee';

// Define the async thunk for fetching candidates
export const fetchAllCandidates = createAsyncThunk<
  AllEmployeeData,
  { page: number; size: number },
  { rejectValue: string }
>('candidates/fetchAll', async ({ page, size }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(API_ROUTES.GET_CANDIDATES, {
      params: { associations: true, page, size },
    });
    return response.data.data as AllEmployeeData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        'Something went wrong. Please try again.';
      return rejectWithValue(message);
    }
    return rejectWithValue('Unexpected error. Please try again later.');
  }
});

// Initial state
interface CandidatesState {
  data: AllEmployeeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CandidatesState = {
  data: null,
  loading: false,
  error: null,
};

// Create the slice
const allCandidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default allCandidatesSlice.reducer;
