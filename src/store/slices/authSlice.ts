import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '@/src/services/authService'; // Import login service

// Define initial state
interface AuthState {
    isAuthenticated: boolean;
    user: object | null;
    error: string | null;
    status: "idle" | "loading" | "success" | "failed";
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
    status: "idle"
};

// Async thunk for logging in
export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {

            const data = await loginUser({email:credentials.email, password:credentials.password});
            return data; // Assuming data contains user information or token
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Slice for auth state
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading"
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "success";
                state.isAuthenticated = true;
                state.user = action.payload.user; // Assuming payload contains user info
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string;
            });
    },
});

export default authSlice.reducer;
