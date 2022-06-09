import { RootState } from "../store";

export const selectVisiblePostIds = (state: RootState) => {
  return state.posts.visiblePostIds;
};
