import { TitleType } from '@/enums';
import { Actor } from './actor';
import { AwardData } from './award';
import { Collection } from './collection';
import { PublishStatus } from '@/enums/publish-status';

export type Crew = {
  role: string;
  people: {
    name: string;
    comment: string;
  }[];
};

export type CastType = {
  actor: Actor;
  character: {
    name: string;
    image: string | null;
  };
};

export type Nomination = {
  title: string;
  actor: Actor | null;
  comment: string | null;
};

export type FilmAward = {
  award: Pick<AwardData, '_id' | 'title' | 'image'>;
  nominations: Nomination[];
};

export type Chapter = {
  title: string;
  part: number;
};

export type SeasonType = {
  number: number;
  episodesCount: number;
  releaseDate: string;
};

export type SeriesExtension = {
  episodesTotal: number;
  seasons: SeasonType[];
};

export type FilmDescription = {
  title: string | null;
  text: string;
};

export type IncludedCollection = {
  collection: Pick<Collection, '_id' | 'title'>;
  order: number;
};

export type FilmData = {
  _id: string;
  type: TitleType;
  style: string;
  title: string;
  genres: string[];
  studios: string[];
  crew: Crew[];
  description: FilmDescription[];
  countries: string[];
  releaseDate: string;
  duration: number;
  cast: CastType[];
  collections: IncludedCollection[];
  budget: number | null;
  boxOffice: number | null;
  awards: FilmAward[];
  seriesExtension: SeriesExtension | null;
  rating: number;
  poster: string;
  trailers: string[];
  chapters: Pick<FilmData, '_id' | 'title' | 'poster'>[];
  watchCount: number;
  createdAt: string;
  updatedAt: string;
  publishStatus: PublishStatus;
};

export type FilmsListItem = Pick<
  FilmData,
  '_id' | 'title' | 'poster' | 'releaseDate'
>;

export type FilmLinkItem = Pick<FilmData, '_id' | 'title'>;

export type FilmSearchResult = Pick<
  FilmData,
  '_id' | 'title' | 'genres' | 'poster' | 'releaseDate'
>;

export type AdditionalActorData = {
  type: 'actor';
  data: Actor;
};

export type AdditionalCrewInfo = {
  type: 'crew';
  data: {
    role: string;
    name: string;
  };
};

export type AdditionalCollectionInfo = {
  type: 'collection';
  data: Collection;
};

export type AdditionalAwardsInfo = {
  type: 'awards';
  data: Omit<AwardData, 'nominations'>[];
};

export type AdditionalInfo =
  | AdditionalActorData
  | AdditionalCrewInfo
  | AdditionalCollectionInfo
  | AdditionalAwardsInfo;

export type FilmsListResponse = {
  films: FilmsListItem[];
  total: number;
  additionalInfo: AdditionalInfo | null;
};

export type FilmsListPagination = {
  pageIndex?: number;
};

export type RandomFilmsList = Pick<FilmData, '_id' | 'title' | 'poster'>[];

export type FilmsListFilters = FilmsListPagination &
  Partial<{
    type: TitleType | null;
    style: string | null;
    genres: string[] | null;
    startDate: string | null;
    endDate: string | null;
    countries: string[] | null;
    studios: string[] | null;
    collection: string | null;
  }>;

export type FilmsAdminListItem = Pick<
  FilmData,
  '_id' | 'title' | 'publishStatus' | 'rating' | 'watchCount'
>;

export type AdminFilmsListResponse = {
  films: FilmsAdminListItem[];
  total: number;
};

export type UpdateFilmPayload = {
  id: string;
  data: Partial<Omit<FilmData, '_id' | 'createdAt' | 'updatedAt'>>;
};
