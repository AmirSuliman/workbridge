// store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    active: boolean;
    roleId: number;
    profilePictureUrl: string;
    employeeId: number;
    role: string;
    permissions: string[];
  } | null;
}

const initialState: UserState = {
  user: null,
};

const myInfo = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = myInfo.actions;
export default myInfo.reducer;
