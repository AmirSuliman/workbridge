import axiosInstance from '@/lib/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateEmergencyContact = createAsyncThunk(
  'employee/updateEmergencyContact',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/your-api-endpoint', payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    data: null,
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateEmergencyContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmergencyContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateEmergencyContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      });
  },
});

export default employeeSlice.reducer;
