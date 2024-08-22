import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/config";

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await appwriteService.getPosts();
    return response.documents;
  }
);

// Async thunk for creating a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { getState }) => {
    const userId = getState().auth.userData.$id;
    const newPost = { ...postData, userID: userId };
    const response = await appwriteService.createPost(newPost);
    return response;
  }
);

// Async thunk for updating a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, updatedData }) => {
    const response = await appwriteService.updatePost(postId, updatedData);
    return response;
  }
);

// Async thunk for deleting a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    await appwriteService.deletePost(postId);
    return postId;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.$id === action.payload.$id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.$id !== action.payload);
      });
  },
});

export default postSlice.reducer;
