import { RootState } from "../app/store";

export const selectSearchTerm = (state: RootState) => {
  return state.search.searchTerm;
};
