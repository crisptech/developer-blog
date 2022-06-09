import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PostState = {
  globalPosts: Post[];
  visiblePostIds: string[];
};

const initialState: SearchState = {
  searchTerm: "",
  filters: {
    tags: {
      globalTags: [],
      filterTags: [],
    },
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
  },
});

export const { updateSearchTerm, updateGlobalTags, updateFilteredTags } =
  searchSlice.actions;

export default searchSlice.reducer;
