import { RootState } from "../app/store";

export const selectVisiblePostIds = (state: RootState) => {
  return state.posts.visiblePostIds;
};
