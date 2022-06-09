import { RootState } from "../store";

const selectGlobalTags = (state: RootState) => {
  return state.search.filters.tags.globalTags;
};
