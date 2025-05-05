import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load from localStorage if exists
const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

const initialState = {
  users: storedUsers,
  loading: false,
};

// Update localStorage whenever state changes
const saveToLocalStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return storedUsers; // Just return local ones
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = { ...action.payload, id: Date.now() };
      state.users.push(newUser);
      saveToLocalStorage(state.users);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      saveToLocalStorage(state.users);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
