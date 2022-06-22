import { AnyAction, combineReducers } from "redux";
import searchReducer from "../lib/slices/searchSlice";
import postsReducer from "../lib/slices/postsSlice";
import configReducer from "../lib/slices/configSlice";
import { HYDRATE } from "next-redux-wrapper";
import { SearchState } from "../lib/types/search";
import { PostState } from "../lib/types/posts";
import { diff } from "jsondiffpatch";
import { ConfigState } from "../lib/types/config";

export const combinedReducer = combineReducers({
  search: searchReducer,
  posts: postsReducer,
  config: configReducer,
});

type State = {
  search: SearchState;
  posts: PostState;
  config: ConfigState;
};

export const rootReducer = (state: State | undefined, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const clientState = { ...state };
    const serverState = { ...action.payload };
    let nextState: State = { ...clientState, ...serverState };

    // All store data within search is persisted during hydration
    // enabling client data to be persisted during site wide navigation
    if (
      state &&
      state.config.initialLoad !== true &&
      diff(state, serverState)
    ) {
      console.log("client state", state);
      console.log("server state", serverState);
      nextState = {
        ...serverState,
        ...clientState,
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
