import { SortType } from "./sort";

export type SearchState = {
  searchTerm: string;
  filters: {
    tags: {
      globalTags: string[];
      filterTags: string[];
    };
  };
  sort: {
    /**
     * ascending: true, descending: false
     */
    sortOrder: boolean;
    sortType: SortType;
  };
};
