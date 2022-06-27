import { RootState } from "../../app/store";

export const selectVisibleProjectIds = (state: RootState) => {
  return state.projects.visibleProjectIds;
};
