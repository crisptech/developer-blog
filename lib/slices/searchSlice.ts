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
    postTags: {
      globalTags: [],
      filterTags: [],
    },
    projectTags: {
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
    updateGlobalPostTags: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          postTags: {
            ...state.filters.postTags,
            globalTags: [...action.payload],
          },
        },
      };
    },
    updateGlobalProjectTags: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          projectTags: {
            ...state.filters.projectTags,
            globalTags: [...action.payload],
          },
        },
      };
    },
    updatePostsFilteredTags: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          postTags: {
            ...state.filters.postTags,
            filterTags: [...action.payload],
          },
        },
      };
    },
    updateProjectsFilteredTags: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          projectTags: {
            ...state.filters.projectTags,
            filterTags: [...action.payload],
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
  updateGlobalPostTags,
  updatePostsFilteredTags,
  updateGlobalProjectTags,
  updateProjectsFilteredTags,
  updateSortOrder,
  updateSortType,
} = searchSlice.actions;

export default searchSlice.reducer;
