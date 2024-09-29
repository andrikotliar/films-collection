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
  watchCount?: number;
  rating?: number;
  ['collections.key']?: ArrayFilter;
  ['seriesExtension.episodesTotal']?: number;
  ['seriesExtension.seasons']?: {
    $size: number;
  };
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
