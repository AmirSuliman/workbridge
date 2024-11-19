// src/store/usersSlice.ts
import { addUser, fetchUsers } from '@/src/services/userService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Define the state interface
interface UserState {
    users: Array<object>;
    total: number;
    currentPage: number;
    pageSize: number;
    error: string | null;
    status: 'idle' | 'loading' | 'success' | 'failed';
    createStatus: 'idle' | 'loading' | 'success' | 'failed';
    sortBy: string | null;
    sortOrder: 'asc' | 'desc' | null;
    filter: string | null; // Example filter, e.g., a search term
}

const initialState: UserState = {
    users: [],
    total: 0,
    currentPage: 1,
    pageSize: 10,
    error: null,
    status: 'idle',
    createStatus: 'idle',
    sortBy: null,
    sortOrder: null,
    filter: null,
};

// Async thunk for fetching users with pagination, sorting, and filtering
export const getUsers = createAsyncThunk(
    'users/fetchUsers',
    async (
        { page, pageSize = 5, sortBy, sortOrder, filter }:
            { page: number; pageSize: number; sortBy: string | null; sortOrder: 'asc' | 'desc' | null; filter: string | null },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetchUsers({ page, pageSize });
            return { ...response, pageSize };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);


export const createUser = createAsyncThunk(
    'users/createUser',
    async (user: object, { rejectWithValue }) => {
        try {
            const response = await addUser(user);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create User');
        }
    }
);



const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSort: (state, action) => {
            state.sortBy = action.payload.sortBy;
            state.sortOrder = action.payload.sortOrder;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload.data.items;
                state.total = action.payload.data.totalItems;
                state.pageSize = action.payload.pageSize;

            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            }).addCase(createUser.pending, (state) => {
                state.createStatus = 'loading';
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.createStatus = 'success';
                console.log(action.payload, "action.payload")
                state.users = [action.payload, ...state.users]; // Add new user to the top of the list
                state.total += 1; 
            })
            .addCase(createUser.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.error = action.payload as string; // Error message
            });
    },
});

export const { setCurrentPage, setSort, setFilter } = usersSlice.actions;

export default usersSlice.reducer;
