import { RootState } from "../../app/store";

export const selectFilteredTags = (state: RootState) => {
  return state.search.filters.postTags.filterTags;
};
