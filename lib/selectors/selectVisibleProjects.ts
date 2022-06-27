import { createSelector } from "@reduxjs/toolkit";
import { map, pick } from "ramda";
import { selectGlobalProjects } from "./selectGlobalProjects";
import { selectVisibleProjectIds } from "./selectVisibleProjectIds";

export const selectVisibleProjects = createSelector(
  selectVisibleProjectIds,
  selectGlobalProjects,
  (visibleProjectIds, globalProjects) => {
    console.log(visibleProjectIds);
    return map((id: string) => {
      const project = pick([id], globalProjects);
      return project[id];
    }, visibleProjectIds);
  }
);
