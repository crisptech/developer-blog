import { RootState } from "../../app/store";

export const selectSortOrder = (state: RootState) => {
  return state.search.sort.sortOrder;
};
