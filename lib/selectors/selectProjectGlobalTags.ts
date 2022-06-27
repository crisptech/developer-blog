import { RootState } from "../../app/store";

export const selectProjectGlobalTags = (state: RootState) => {
  return state.search.filters.projectTags.globalTags;
};
