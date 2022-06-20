import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortOrder, SortType } from "../types/sort";
import { SearchState } from "../types/search";

const initialState: SearchState = {
  searchTerm: "",
  filters: {
    tags: {
      globalTags: [],
      filterTags: [],
    },
  },
  sort: {
    sortOrder: "ASCENDING",
    sortType: "DATE",
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searchTerm: action.payload,
      };
    },
    updateGlobalTags: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        filters: {
          tags: {
            ...state.filters.tags,
            globalTags: action.payload,
          },
        },
      };
    },
    updateFilteredTags: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        filters: {
          tags: {
            ...state.filters.tags,
            filteredTags: action.payload,
          },
        },
      };
    },
    updateSortOrder: (state, action: PayloadAction<SortOrder>) => {
      return {
        ...state,
        sort: {
          ...state.sort,
          sortOrder: action.payload,
        },
      };
    },
    updateSortType: (state, action: PayloadAction<SortType>) => {
      return {
        ...state,
        sort: {
          ...state.sort,
          sortType: action.payload,
        },
      };
    },
  },
});

export const { updateSearchTerm, updateGlobalTags, updateFilteredTags } =
  searchSlice.actions;

export default searchSlice.reducer;
