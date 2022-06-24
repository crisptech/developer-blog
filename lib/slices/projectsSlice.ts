import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState, Post } from "../types/posts";

const initialState: PostState = {
  globalPosts: {},
  visiblePostIds: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateGlobalPosts: (state, action: PayloadAction<Record<string, Post>>) => {
      return {
        ...state,
        globalPosts: {
          ...state.globalPosts,
          ...action.payload,
        },
      };
    },
    udpateVisiblePostIds: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        visiblePostIds: action.payload,
      };
    },
  },
});

export const { updateGlobalPosts, udpateVisiblePostIds } = searchSlice.actions;

export default searchSlice.reducer;
