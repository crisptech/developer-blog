import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortOrder, SortType } from "../types/sort";
import { SearchState } from "../types/search";

// TODO: Implement search term functionality,
// TODO: Implement filter - tags functionality, create chip list under description
// TODO: Create combo box for the sort type functionality
// TODO: Integrate sort order functionality with sort type functionality
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
          ...state.filters,
          tags: {
            ...state.filters.tags,
            globalTags: [...action.payload],
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
            filteredTags: [...action.payload],
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

export const {
  updateSearchTerm,
  updateGlobalTags,
  updateFilteredTags,
  updateSortOrder,
  updateSortType,
} = searchSlice.actions;

export default searchSlice.reducer;
