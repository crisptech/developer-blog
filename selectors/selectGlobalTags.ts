import { RootState } from "../app/store";

const selectGlobalTags = (state: RootState) => {
  return state.search.filters.tags.globalTags;
};
