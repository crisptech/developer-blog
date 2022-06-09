import { RootState } from "../app/store";

export const selectGlobalTags = (state: RootState) => {
  return state.search.filters.tags.globalTags;
};
