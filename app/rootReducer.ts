import { AnyAction, combineReducers } from "redux";
import searchReducer from "../lib/slices/searchSlice";
import postsReducer from "../lib/slices/postsSlice";
import { HYDRATE } from "next-redux-wrapper";
import { SearchState } from "../lib/types/search";
import { PostState } from "../lib/types/posts";

export const combinedReducer = combineReducers({
  search: searchReducer,
  posts: postsReducer,
});

type State = {
  search: SearchState;
  posts: PostState;
};

export const rootReducer = (state: State | undefined, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const clientState = { ...state };
    const serverState = { ...action.payload };
    let nextState: State = { ...clientState, ...serverState };

    // All store data within search is persisted during hydration
    // enabling client data to be persisted during site wide navigation
    if (state) {
      nextState = {
        ...clientState,
        ...serverState,
        search: {
          ...serverState.search,
          ...state.search,
        },
      };
    }

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
