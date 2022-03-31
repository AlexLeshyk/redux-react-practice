import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "..";
import { client } from "../../api/client";
import { IUser } from "../../types/posts";

const usersAdapter = createEntityAdapter<IUser>();

const initialState = usersAdapter.getInitialState();

// const initialState: IUser[] = [];

export const fetchUsers = createAsyncThunk("postUsers/fetchUsers", async () => {
  const response = await client.get("/fakeApi/users");
  return response.data;
});

const usersSlice = createSlice({
  name: "postUsers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
    // builder.addCase(fetchUsers.fulfilled, (state, action) => {
    //   return action.payload;
    // });
  },
});

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>((state) => state.postUsers);

// export const selectUserById = (state: RootState, userId: string) => {
//   return state.postUsers.find((user: IUser) => user.id === userId);
// };

// export const selectAllUsers = (state: RootState) => {
//   return state.postUsers;
// };
