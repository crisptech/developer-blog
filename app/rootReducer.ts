import { AnyAction, combineReducers } from "redux";
import searchReducer from "../slices/searchSlice";
import postsReducer from "../slices/postsSlice";
import { HYDRATE } from "next-redux-wrapper";
import { SearchState } from "../types/search";
import { PostState } from "../types/posts";

export const combinedReducer = combineReducers({
  search: searchReducer,
  posts: postsReducer,
});

type State = {
  search: SearchState;
  posts: PostState;
};

// https://stackoverflow.com/questions/64139344/how-to-use-typescript-next-redux-wrapper-getserversideprops
export const rootReducer = (state: State | undefined, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    // if (state?.search) nextState.search = state.search;
    // if (state?.posts) nextState.posts = state.posts;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
