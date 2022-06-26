import { SortOrder as SortOrder, SortType } from "./sort";

export type SearchState = {
  searchTerm: string;
  filters: {
    postTags: {
      globalTags: string[];
      filterTags: string[];
    };
    projectTags: {
      globalTags: string[];
      filterTags: string[];
    };
  };
  sort: {
    sortOrder: SortOrder;
    sortType: SortType;
  };
};
