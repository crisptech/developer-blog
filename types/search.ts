import { SortOrder as SortOrder, SortType } from "./sort";

export type SearchState = {
  searchTerm: string;
  filters: {
    tags: {
      globalTags: string[];
      filterTags: string[];
    };
  };
  sort: {
    sortOrder: SortOrder;
    sortType: SortType;
  };
};
