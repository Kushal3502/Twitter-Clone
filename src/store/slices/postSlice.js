import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tweets: [],
};

const postSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const post = {
        $id: action.payload.$id,
        userId: action.payload.userId,
        name: action.payload.name,
        content: action.payload.content,
        featuredImage: action.payload.featuredImage,
        initialLikes: action.payload.likes || [],
      };
      state.tweets.push(post);
    },
    updatePost: () => {},
    deletePost: () => {},
    clearPosts: (state) => {
      state.tweets = [];
    },
    updateTweetLikes: (state, action) => {
      console.log(action.payload);
      const { $id, user } = action.payload;
      const tweet = state.tweets.tweets?.find((tweet) => tweet.$id === $id);
      if (tweet) {
        tweet.initialLikes.push(user);
      }
    },
  },
});

export const { addPost, updatePost, deletePost, clearPosts, updateTweetLikes } =
  postSlice.actions;

export default postSlice.reducer;
