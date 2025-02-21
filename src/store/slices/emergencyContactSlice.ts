// emergencyContactSlice.ts
import { EmergencyContactProps } from '@/types/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmergencyContactState {
  contact: EmergencyContactProps[];
  loading: boolean;
  error: string | null;
}
const initialState: EmergencyContactState = {
  contact: [],
  loading: false,
  error: null,
};

const emergencyContactSlice = createSlice({
  name: 'emergencyContact',
  initialState,
  reducers: {
    setEmergencyContact: (
      state,
      action: PayloadAction<EmergencyContactProps[]>
    ) => {
      state.contact = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetEmergencyContact: (state) => {
      state.contact = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setEmergencyContact,
  setLoading,
  setError,
  resetEmergencyContact,
} = emergencyContactSlice.actions;

export default emergencyContactSlice.reducer;
