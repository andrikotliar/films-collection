type FindAllFilters = {
  type: string[];
  genre: string[];
  startDate: string;
  endDate: string;
  country: string[];
  studio: string[];
  isLatestAdded: boolean;
  collection: string[];
};

type FindAllQueries = Partial<FindAllFilters> & {
  limit: number;
  skip: number;
};

export type { FindAllQueries, FindAllFilters };