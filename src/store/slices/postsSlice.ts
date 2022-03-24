import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IPost, IPostState } from "../../types/posts";
import { client } from "../../api/client";

// const initialState = [
//   {
//     id: "1",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     title: "First Post!",
//     content: "Hello!",
//     user: "1",
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
//   {
//     id: "2",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     title: "Second Post",
//     content: "More text",
//     user: "2",
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
// ];

const initialState: IPostState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.posts.push(action.payload);
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post: IPost) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post: IPost) => post.id === postId);
      if (existingPost) {
        // @ts-ignore
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
      });
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
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
