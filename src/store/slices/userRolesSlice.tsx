// src/store/rolesSlice.ts
import { getUserRoles } from '@/src/services/authService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface RolesState {
    roles: any;
    error: string | null;
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: RolesState = {
    roles: [],
    error: null,
    status: 'idle',
};

// Async thunk for fetching user roles
export const fetchUserRoles = createAsyncThunk(
    'roles/fetchUserRoles',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getUserRoles(); // Assuming fetchUserRoles fetches an array of roles
            return data; // Return the roles data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch roles');
        }
    }
);

// Slice for roles state
const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserRoles.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserRoles.fulfilled, (state, action) => {
                state.status = 'success';
                state.roles = action.payload; // Assuming payload is an array of roles
            })
            .addCase(fetchUserRoles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string; // Error message
            });
    },
});

export default rolesSlice.reducer;
