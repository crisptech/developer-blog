import { RootState } from "../../app/store";

export const selectGlobalProjects = (state: RootState) => {
  return state.projects.globalProjects;
};
