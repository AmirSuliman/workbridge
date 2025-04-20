// noteSlice.ts
import axiosInstance from '@/lib/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Note {
  id: number;
  title: string;
  note: string;
  employeeId: number;
  createdAt: string;
  // updatedAt: string;
}

interface NoteState {
  notes: Note[];
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  crudStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedNote: Note | null;
  updatedNote: { title: string; note: string };
}

const initialState: NoteState = {
  notes: [],
  fetchStatus: 'idle',
  crudStatus: 'idle',
  error: null,
  selectedNote: null,
  updatedNote: { title: '', note: '' },
};

// Async Thunks
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async ({ id }: { id: number }) => {
    const response = await axiosInstance.get(`/notes/${id}`);
    return response.data.data.items;
  }
);

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (
    newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/note', newNote);
      return response.data.data; // Adjust based on your API response structure
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, payload }: { id: number; payload: Partial<Note> }) => {
    const response = await axiosInstance.put(`/note/${id}`, payload);
    console.log('thunk put res: ', response.data);
    return response.data.data;
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: number) => {
    await axiosInstance.delete(`/note/${id}`);
    return id;
  }
);

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSelectedNote: (state, action: PayloadAction<Note | null>) => {
      state.selectedNote = action.payload;
      if (action.payload) {
        state.updatedNote = {
          title: action.payload.title,
          note: action.payload.note,
        };
      }
    },
    updateNoteFields: (
      state,
      action: PayloadAction<{
        field: keyof NoteState['updatedNote'];
        value: string;
      }>
    ) => {
      state.updatedNote[action.payload.field] = action.payload.value;
    },
    resetCrudStatus: (state) => {
      state.crudStatus = 'idle';
    },
    closeModals: (state) => {
      state.selectedNote = null;
      state.updatedNote = { title: '', note: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch notes';
      })

      // Post Note
      .addCase(createNote.pending, (state) => {
        state.crudStatus = 'loading';
      })
      .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.crudStatus = 'succeeded';
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.crudStatus = 'failed';
        state.error =
          (action.payload as any)?.message || 'Failed to create note';
      })

      // Update Note
      .addCase(updateNote.pending, (state) => {
        state.crudStatus = 'loading';
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.crudStatus = 'succeeded';
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = { ...state.notes[index], ...action.payload };
        }
        state.selectedNote = null;
        state.updatedNote = { title: '', note: '' };
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.crudStatus = 'failed';
        state.error = action.error.message || 'Failed to update note';
      })

      // Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.crudStatus = 'loading';
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.crudStatus = 'succeeded';
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.crudStatus = 'failed';
        state.error = action.error.message || 'Failed to delete note';
      });
  },
});

export const {
  setSelectedNote,
  updateNoteFields,
  resetCrudStatus,
  closeModals,
} = noteSlice.actions;

export default noteSlice.reducer;
