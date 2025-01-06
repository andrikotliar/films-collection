import { SortingParams } from 'src/common';
import { PublishStatus } from '../enums';

export type FindAllFilters = {
  type: string;
  style: string;
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
  budget: number;
  boxOffice: number;
};

export type ArrayFilter<T = string> = {
  $in: T[];
};

export type DbQueryFilter = Partial<{
  type: string;
  style: string;
  watchCount: number;
  rating: number;
  duration: number;
  genres: ArrayFilter;
  countries: ArrayFilter;
  studios: ArrayFilter;
  ['collections.collection']: string;
  ['seriesExtension.episodesTotal']: number;
  releaseDate: {
    $gte?: string;
    $lte?: string;
  };
  budget: {
    $gte: number;
    $lte: number;
  };
  boxOffice: {
    $gte: number;
    $lte: number;
  };
  publishStatus: {
    $ne: PublishStatus;
  };
  crew: {
    $elemMatch: {
      role: string;
      people: {
        $elemMatch: {
          name: string;
        };
      };
    };
  };
  ['seriesExtension.seasons']: {
    $size: number;
  };
  ['cast.actor']: string;
  ['awards.award']: ArrayFilter;
}>;

export type FindAllQueries = Partial<FindAllFilters> & {
  limit: number;
  skip: number;
};

export type IdParams = {
  id: string;
};

export type FindBySearchString = {
  q: string;
};

export type GetAdminFilmsListQueries = Partial<
  {
    skip: number;
    q: string;
  } & SortingParams
>;

export type AdminFilmsFilters = Partial<{
  title: {
    $regex: string;
    $options: string;
  };
}>;
