import { createSelector } from "@reduxjs/toolkit";
import { selectGlobalPosts } from "./selectGlobalPosts";
import { selectVisiblePostIds } from "./selectVisiblePostIds";
import { map, pick } from "ramda";

export const selectVisiblePosts = createSelector(
  selectVisiblePostIds,
  selectGlobalPosts,
  (visiblePostIds, globalPosts) =>
    map((id: string) => {
      const post = pick([id], globalPosts);
      return post[id];
    }, visiblePostIds)
);
