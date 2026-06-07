import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { NewUser, User } from "../types/user";
import type { RootState } from "./store";

const API_URL = "https://jsonplaceholder.typicode.com/users";

type Status = "idle" | "loading" | "succeeded" | "failed";

export interface UserState {
  users: User[];
  status: Status;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

/**
 * Fetch the initial user list from the API.
 * This is the ONLY network request in the app — add / update / delete
 * are handled locally in Redux per the task requirements.
 */
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return (await response.json()) as User[];
  }
);

/**
 * Add a user locally. No POST request is made — we simulate the async
 * boundary and generate a fresh id from the current state.
 */
export const addUser = createAsyncThunk<User, NewUser, { state: RootState }>(
  "users/addUser",
  async (newUser, { getState }) => {
    const { users } = getState().users;
    const nextId =
      users.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;
    const created: User = { ...newUser, id: nextId };
    return created;
  }
);

/**
 * Update an existing user locally. No PUT request is made.
 */
export const updateUser = createAsyncThunk<User, User>(
  "users/updateUser",
  async (user) => {
    return user;
  }
);

/**
 * Delete a user locally. No DELETE request is made.
 */
export const deleteUser = createAsyncThunk<number, number>(
  "users/deleteUser",
  async (id) => {
    return id;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Synchronous escape hatch in case the UI needs to clear errors.
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = "succeeded";
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load users";
      })

      // Add
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.unshift(action.payload);
      })

      // Update
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export const { clearError } = userSlice.actions;

// Selectors
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUserStatus = (state: RootState) => state.users.status;
export const selectUserError = (state: RootState) => state.users.error;
export const selectUserById = (id: number) => (state: RootState) =>
  state.users.users.find((u) => u.id === id);

export default userSlice.reducer;
