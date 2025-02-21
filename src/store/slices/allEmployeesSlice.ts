// store/employeeSlice.ts
import { EmployeeData } from '@/types/employee';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmployeeState {
  items: EmployeeData[];
}

const initialState: EmployeeState = {
  items: [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<EmployeeData[]>) {
      state.items = action.payload;
    },
    addEmployees(state, action: PayloadAction<EmployeeData[]>) {
      const newEmployees = action.payload.filter(
        (employee) => !state.items.some((e) => e.id === employee.id)
      );
      state.items = [...state.items, ...newEmployees]; // Append new employees
    },
  },
});

export const { setEmployees, addEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
