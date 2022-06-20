export type SortType = "DATE" | "DURATION" | "TITLE";

export type SortTypes = {
  DATE: "DATE";
  DURATION: "DURATION";
  TITLE: "TITLE";
};

export const sortTypesToNum = {
  DATE: 0,
  DURATION: 1,
  TITLE: 2,
};

export type SortOrder = "ASCENDING" | "DESCENDING";
