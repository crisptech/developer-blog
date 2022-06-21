export type SortType = "DATE" | "DURATION" | "TITLE";

export type SortTypes = {
  DATE: "DATE";
  DURATION: "DURATION";
  TITLE: "TITLE";
};

type SortTypesToNum = {
  [x in SortType]: number;
};

export const sortTypesToNum: SortTypesToNum = {
  DATE: 0,
  DURATION: 1,
  TITLE: 2,
};

type SortNumToTypes = {
  [x: number]: SortType;
};

export const sortNumToTypes: SortNumToTypes = {
  0: "DATE",
  1: "DURATION",
  2: "TITLE",
};

export type SortOrder = "ASCENDING" | "DESCENDING";
