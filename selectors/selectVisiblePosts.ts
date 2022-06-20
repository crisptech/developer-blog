import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { selectGlobalPosts } from "./selectGlobalPosts";
import { selectVisiblePostIds } from "./selectVisiblePostIds";
import { map, pick } from "ramda";
import { Post } from "../types/posts";

export const selectVisiblePosts = createSelector(
  selectVisiblePostIds,
  selectGlobalPosts,
  (visiblePostIds, globalPosts) =>
    map((id: string) => {
      const post = pick([id], globalPosts);
      return post[id];
    }, visiblePostIds)
);
