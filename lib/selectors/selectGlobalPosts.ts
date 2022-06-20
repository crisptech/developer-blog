import { RootState } from "../../app/store";

export const selectGlobalPosts = (state: RootState) => {
  return state.posts.globalPosts;
};
