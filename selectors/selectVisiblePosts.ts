import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectGlobalPosts } from "./selectGlobalPosts";
import { selectVisiblePostIds } from "./selectVisiblePostIds";
import { map, pick } from "ramda";
import { Post } from "../types/posts";

type VisiblePosts = Post[];

export const selectVisiblePosts = createSelector(
  selectVisiblePostIds,
  selectGlobalPosts,
  (visiblePostIds, globalPosts): VisiblePosts =>
    map((id: string) => pick([id], globalPosts), visiblePostIds)
);
