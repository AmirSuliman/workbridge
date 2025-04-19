import axiosInstance from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const createFolder = createAsyncThunk(
  'folder/createFolder',
  async (
    { folderName, userId }: { folderName: string; userId: number | undefined },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/folder', {
        name: folderName,
        createdBy: userId,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unknown error occurred.');
    }
  }
);

const folderSlice = createSlice({
  name: 'folder',
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFolder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export const { resetState } = folderSlice.actions;
export default folderSlice.reducer;
