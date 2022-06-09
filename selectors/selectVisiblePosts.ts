import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { selectGlobalPosts } from "./selectGlobalPosts";
import { selectVisiblePostIds } from "./selectVisiblePostIds";
import { map, pick } from "ramda";

export const selectVisiblePosts = createSelector(
  selectVisiblePostIds,
  selectGlobalPosts,
  (visiblePostIds, globalPosts) =>
    map((id: string) => pick([id], globalPosts), visiblePostIds)
);
