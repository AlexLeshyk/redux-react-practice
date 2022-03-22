import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoState } from "../../types/todo";

const initialState: TodoState = {
  todos: [],
  loading: "idle",
  error: null,
  limit: 5,
  page: 1,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodoPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = "idle";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.error = "error";
      })
      .addDefaultCase(() => {});
  },
});

export const fetchTodos = createAsyncThunk(
  "users/fetchTodos",
  async (arg: { page: number; limit: number }) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos", {
        params: { _page: arg.page, _limit: arg.limit },
      });
      if (!response.data) {
        throw new Error(`Could not fetch url, status: ${response.statusText}`);
      }

      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

const { actions, reducer } = todosSlice;
export default reducer;

export const { setTodoPage } = actions;
