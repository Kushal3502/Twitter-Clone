import { createSlice } from "@reduxjs/toolkit";
import { ID } from "appwrite";

const initialState = {
  tweets: [],
};

const postSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const post = {
        id: action.payload.$id,
        userId: action.payload.userId,
        name: action.payload.name,
        content: action.payload.content,
        featuredImage: action.payload.featuredImage,
      };
      state.tweets.push(post);
    },
    updatePost: () => {},
    deletePost: () => {},
    clearPosts: (state) => {
      state.tweets = [];
    },
  },
});

export const { addPost, updatePost, deletePost, clearPosts } =
  postSlice.actions;

export default postSlice.reducer;
