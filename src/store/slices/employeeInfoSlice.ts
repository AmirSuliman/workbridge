import { getEmployeeInfo } from '@/services/getEmployeeInfo';
import { EmployeeData } from '@/types/employee';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface EmployeeState {
  data: EmployeeData | null;
  error: string | null;
  loading: boolean;
}

const initialState: EmployeeState = {
  data: null,
  error: null,
  loading: false,
};

// Create an async thunk for fetching employee data
export const fetchEmployeeData = createAsyncThunk(
  'employee/fetchEmployeeData',
  async ({ userId }: { userId: number | undefined }, { rejectWithValue }) => {
    try {
      const { data } = await getEmployeeInfo(userId);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch employee data');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearEmployeeData(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
    updateEmployeeData(state, action: PayloadAction<EmployeeData>) {
      state.data = action.payload; // Update the Redux state with the new data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployeeData.fulfilled,
        (state, action: PayloadAction<EmployeeData>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchEmployeeData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.data = null;
        state.loading = false;
      });
  },
});

export const { clearEmployeeData, updateEmployeeData } = employeeSlice.actions;
export default employeeSlice.reducer;
