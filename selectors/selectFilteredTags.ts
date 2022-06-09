import { RootState } from "../store";

const selectFilteredTags = (state: RootState) => {
  return state.search.filters.tags.filterTags;
};
