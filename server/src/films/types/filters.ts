type FindAllFilters = {
  type: string[];
  genres: string[];
  startDate: string;
  endDate: string;
  countries: string[];
  studios: string[];
  collection: string;
  seasonsTotal: number;
  episodesTotal: number;
  watchCount: number;
  rating: number;
  duration: number;
  personName: string;
  personRole: string;
  actorId: string;
  awards: string[];
};

type ArrayFilter<T = string> = {
  $in: T[];
};

type DbQueryFilter = Partial<{
  type: ArrayFilter;
  genres: ArrayFilter;
  releaseDate: {
    $gte?: string;
    $lte?: string;
  };
  countries: ArrayFilter;
  studios: ArrayFilter;
  watchCount: number;
  rating: number;
  ['collections.key']: ArrayFilter;
  ['seriesExtension.episodesTotal']: number;
  ['seriesExtension.seasons']: {
    $size: number;
  };
  ['crew.role']: string;
  ['crew.people.name']: string;
  ['cast.actor']: string;
  ['awards.awardKey']: ArrayFilter;
}>;

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
