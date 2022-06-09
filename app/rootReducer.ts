import { combineReducers } from "redux";
import searchReducer from "../slices/searchSlice";
import postsReducer from "../slices/postsSlice";

export const rootReducer = combineReducers({
  search: searchReducer,
  posts: postsReducer,
});
