import { fetchCandidates } from '@/services/candidateservice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the state interface
interface CandidateState {
  users: Array<object>;
  total: number;
  currentPage: number;
  pageSize: number;
  searchQuery?: string;
  error: string | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
  createStatus: 'idle' | 'loading' | 'success' | 'failed';
  sortBy: string | null;
  sortOrder: 'asc' | 'desc' | null;
  filter: string | null; 
}

const initialState: CandidateState = {
  users: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  searchQuery: '',
  error: null,
  status: 'idle',
  createStatus: 'idle',
  sortBy: null,
  sortOrder: null,
  filter: null,
};

export const getCandidate = createAsyncThunk(
    'candidate/fetchCandidates',
    async (
      { page, pageSize, searchQuery, sortBy, sortOrder, filter },
      { rejectWithValue, getState }
    ) => {
      const state = getState() as any;
      const token = state.auth.token; // Ensure token is available in state
  
      console.log('Token:', token);
      if (!token) {
        console.error('Authorization token is missing');
        throw new Error('Authorization token is required');
      }
  
      try {
        const response = await fetchCandidates({
          token,
          page,
          pageSize,
          searchQuery,
          sortBy,
          sortOrder,
          filter,
        });
        return response;
      } catch (error: any) {
        console.error('Error in getCandidate:', error);
        return rejectWithValue(error.message || 'Failed to fetch candidates');
      }
    }
  );
  
  

  const candidateSlice = createSlice({
    name: 'candidate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCandidate.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getCandidate.fulfilled, (state, action) => {
          state.status = 'success';
          state.users = action.payload.users;
          state.total = action.payload.total;
        })
        .addCase(getCandidate.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        });
    },
  });
  
  export default candidateSlice.reducer;
  