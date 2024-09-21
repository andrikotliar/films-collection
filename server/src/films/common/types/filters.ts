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

type FindOneParams = {
  id: string;
};

type FindBySearchString = {
  q: string;
};

export type {
  FindAllQueries,
  FindAllFilters,
  FindOneParams,
  FindBySearchString,
};
