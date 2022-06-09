import {
  AnyAction,
  CombinedState,
  combineReducers,
  EmptyObject,
  Reducer,
} from "redux";
import searchReducer from "../slices/searchSlice";
import postsReducer from "../slices/postsSlice";
import { HYDRATE } from "next-redux-wrapper";
import { SearchState } from "../types/search";
import { PostState } from "../types/posts";

export const combinedReducer = combineReducers({
  search: searchReducer,
  posts: postsReducer,
});

export const rootReducer = (
  state: CombinedState<{ search: SearchState; posts: PostState }>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.search) nextState.search = state.search;
    if (state.posts) nextState.posts = state.posts;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
