import { RootState } from "../store";

export const selectGlobalPosts = (state: RootState) => {
  return state.posts.globalPosts;
};
