import axiosInstance from '@/lib/axios';
import { Policy } from '@/types/policy';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const publishPolicy = createAsyncThunk<
  Policy,
  Policy,
  { rejectValue: string }
>('policy/publishPolicy', async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/policy/', payload);
    return response.data.data; // Return the policy object from the API response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data?.message ||
          'An error occurred while publishing the policy.'
      );
    }
    return rejectWithValue('An error occurred while publishing the policy.');
  }
});

const policySlice = createSlice({
  name: 'policy',
  initialState: {
    data: null as Policy | null, // Holds the policy data
    loading: false,
    error: null as string | null,
  },
  reducers: {
    resetPolicyState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Save the policy data in state
      })
      .addCase(publishPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const { resetPolicyState } = policySlice.actions;
export default policySlice.reducer;
