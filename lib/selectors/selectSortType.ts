import { RootState } from "../../app/store";

export const selectSortType = (state: RootState) => {
  return state.search.sort.sortType;
};
