// store/employeeSlice.ts
import { getAllEmployees } from '@/services/getAllEmployees';
import { AllEmployeeData, EmployeeData } from '@/types/employee';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmployeeState {
  items: EmployeeData[];
  loading: boolean;
  error: string | null;
  uniqueJobTitles: string[];
  uniqueDepartments: string[];
  currentPage: number;
  totalItems: number;
  deleteModalOpen: boolean;
  employeeToDelete: EmployeeData | null;
}

const initialState: EmployeeState = {
  items: [],
  loading: false,
  error: null,
  uniqueJobTitles: [],
  uniqueDepartments: [],
  currentPage: 1,
  totalItems: 0,
  deleteModalOpen: false,
  employeeToDelete: null,
};

// Async thunk to fetch employees
export const fetchEmployees = createAsyncThunk<
  AllEmployeeData,
  { page: number; pageSize: number; searchTerm: string }
>(
  'employees/fetchEmployees',
  async ({ page, pageSize, searchTerm }, { rejectWithValue }) => {
    try {
      const { data } = await getAllEmployees(page, pageSize, searchTerm);
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch employees.');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setEmployees(state, action: PayloadAction<EmployeeData[]>) {
      state.items = action.payload;
    },
    addEmployees(state, action: PayloadAction<EmployeeData[]>) {
      const newEmployees = action.payload.filter(
        (employee) => !state.items.some((e) => e.id === employee.id)
      );
      state.items = [...state.items, ...newEmployees]; // Append new employees
    },
    deleteEmployee(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (employee) => employee.id !== action.payload
      );
    },
    openDeleteModal(state, action: PayloadAction<EmployeeData>) {
      state.deleteModalOpen = true;
      state.employeeToDelete = action.payload;
    },
    closeDeleteModal(state) {
      state.deleteModalOpen = false;
      state.employeeToDelete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<AllEmployeeData>) => {
          state.loading = false;
          state.items = action.payload.items;
          state.totalItems = action.payload.totalItems;

          state.uniqueJobTitles = Array.from(
            new Set(action.payload.items.map((e) => e.tittle))
          );
          state.uniqueDepartments = Array.from(
            new Set(action.payload.items.map((e) => e.department?.name))
          );
        }
      )
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setEmployees,
  addEmployees,
  deleteEmployee,
  setCurrentPage,
  openDeleteModal,
  closeDeleteModal,
} = employeeSlice.actions;
export default employeeSlice.reducer;
