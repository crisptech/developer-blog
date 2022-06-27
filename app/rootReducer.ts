import { AnyAction, combineReducers } from "redux";
import searchReducer from "../lib/slices/searchSlice";
import postsReducer from "../lib/slices/postsSlice";
import configReducer from "../lib/slices/configSlice";
import projectsReducer from "../lib/slices/projectsSlice";
import { HYDRATE } from "next-redux-wrapper";
import { SearchState } from "../lib/types/search";
import { PostState } from "../lib/types/posts";
import { diff } from "jsondiffpatch";
import { ConfigState } from "../lib/types/config";
import { ProjectState } from "../lib/types/projects";

export const combinedReducer = combineReducers({
  search: searchReducer,
  posts: postsReducer,
  projects: projectsReducer,
  config: configReducer,
});

type State = {
  search: SearchState;
  posts: PostState;
  projects: ProjectState;
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
      state.config.initialLoad === false &&
      diff(state, serverState)
    ) {
      console.log("server", serverState);

      nextState = {
        ...serverState,
        ...clientState,
        search: {
          ...serverState.search,
          ...state.search,
          sort: {
            ...state.search.sort,
          },
          filters: {
            ...serverState.search.filters,
            ...state.search.filters,
          },
        },
        config: {
          ...serverState.config,
          initialLoad: state.config.initialLoad,
        },
      };
    }

    console.log("client", clientState);
    console.log("server", serverState);
    console.log("next", nextState);
    console.log(diff(serverState, clientState));

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
