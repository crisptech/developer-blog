import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectState } from "../types/projects";

const initialState: ProjectState = {
  globalProjects: {},
  visibleProjectIds: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateGlobalProjects: (
      state,
      action: PayloadAction<Record<string, Project>>
    ): ProjectState => {
      return {
        ...state,
        globalProjects: {
          ...state.globalProjects,
          ...action.payload,
        },
      };
    },
    updateVisibleProjectIds: (
      state,
      action: PayloadAction<string[]>
    ): ProjectState => {
      return {
        ...state,
        visibleProjectIds: action.payload,
      };
    },
    updateGlobalProjectTags: (
      state,
      action: PayloadAction<string[]>
    ): ProjectState => {
      return {
        ...state,
      };
    },
  },
});

export const { updateGlobalProjects, updateVisibleProjectIds } =
  searchSlice.actions;

export default searchSlice.reducer;
