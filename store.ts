import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import postsReducer from "./slices/postsSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
