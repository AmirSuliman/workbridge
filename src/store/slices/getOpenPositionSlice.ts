// features/jobs/jobsSlice.ts
import { API_ROUTES } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Job {
  id: number;
  tittle: string;
  description: string;
  status: string;
  employmentType: string;
  departmentId: number;
  salary: number;
  minYearsExperience: number;
  dateOpened: string;
  locationId: number;
  hiringLeadId: number;
  reportingToEmployeeId: number;
  createdAt: string;
  jobApplicationCount: number;
  hiringLead: {
    firstName: string;
    lastName: string;
    department: { id: number; name: string };
    location: { city: string; state: string; country: string };
  };
}

interface JobsState {
  items: Job[];
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  items: [],
  totalItems: 0,
  loading: false,
  error: null,
};

export const fetchOpenPositions = createAsyncThunk(
  'jobs/fetchOpenPositions',
  async (
    { page, size }: { page: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(API_ROUTES.GET_JOBS, {
        params: { page, size },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch jobs'
      );
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpenPositions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpenPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchOpenPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default jobsSlice.reducer;
