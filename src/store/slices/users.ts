import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersState } from "../../types/users";

const initialState: UsersState = {
  users: [],
  loading: "",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users?_limit=5");
    if (!response.data) {
      throw new Error(`Could not fetch url, status: ${response.statusText}`);
    }

    return response.data;
  } catch (e) {
    throw e;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUserById: (state, action) => {
      state.users = state.users.filter((item) => item.id !== action.payload);
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.error = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = usersSlice;
export default reducer;

export const { addUser, deleteUserById } = actions;
