import { RootState } from "../app/store";

const selectFilteredTags = (state: RootState) => {
  return state.search.filters.tags.filterTags;
};
