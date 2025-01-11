// store/folderSlice.js
import axiosInstance from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createFolder = createAsyncThunk(
  'folder/createFolder',
  async (
    { folderName, userId }: { folderName: string; userId: number | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/folder', {
        name: folderName,
        createdBy: userId,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue((error as any)?.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

const folderSlice = createSlice({
  name: 'folder',
  initialState: {
    loading: false,
    error: null as unknown,
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
        state.error = action.payload;
      });
  },
});

export const { resetState } = folderSlice.actions;
export default folderSlice.reducer;
