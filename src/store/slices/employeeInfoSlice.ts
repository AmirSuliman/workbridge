import { EmployeeData } from '@/types/employee';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmployeeState {
  data: EmployeeData | null; 
  error: string | null;
}

const initialState: EmployeeState = {
  data: null,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeeData(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.error = null;
    },
    setEmployeeError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.data = null;
    },
    clearEmployeeData(state) {
      state.data = null;
      state.error = null;
    },
  },
});

export const { setEmployeeData, setEmployeeError, clearEmployeeData } =
  employeeSlice.actions;
export default employeeSlice.reducer;
