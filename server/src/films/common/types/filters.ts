type FindAllFilters = {
  type: string[];
  genres: string[];
  startDate: string;
  endDate: string;
  countries: string[];
  studios: string[];
  isLatestAdded: boolean;
  collections: string[];
  episodesTotal: number;
  watchCount?: number;
  rating?: number;
};

type ArrayFilter<T = string> = {
  $in: T[];
};

type DbQueryFilter = {
  type?: ArrayFilter;
  genres?: ArrayFilter;
  releaseDate?: {
    $gte?: string;
    $lte?: string;
  };
  countries?: ArrayFilter;
  studios?: ArrayFilter;
  ['collections.key']?: ArrayFilter;
  ['seriesExtension.episodesTotal']?: number;
  ['seriesExtension.seasons']?: {
    $size: number;
  };
  watchCount?: number;
  rating?: number;
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
  DbQueryFilter,
};
