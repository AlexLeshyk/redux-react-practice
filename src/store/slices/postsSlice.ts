import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IPost, IPostSaved, IPostState, IReaction } from "../../types/posts";
import { client } from "../../api/client";

const initialState: IPostState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // postAdded(state, action) {
    //   state.posts.push(action.payload);
    // },
    postUpdated(state, action: PayloadAction<IPostSaved>) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post: IPost) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action: PayloadAction<IReaction>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post: IPost) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
        console.log("reaction", reaction);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const { postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => {
  return state.posts.posts;
};

export const selectPostById = (state: RootState, postId: string | undefined) => {
  return state.posts.posts.find((post: IPost) => post.id === postId);
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  console.log("response", response);
  return response.data;
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost: IPost) => {
  const response = await client.post("/fakeApi/posts", initialPost);
  return response.data;
});
