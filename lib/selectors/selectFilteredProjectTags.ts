import { RootState } from "../../app/store";

export const selectFilteredProjectTags = (state: RootState) => {
  return state.search.filters.projectTags.filterTags;
};
