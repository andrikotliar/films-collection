import { TitleType } from '@/enums';
import { Actor } from './actor';
import { AwardData } from './award';
import { Collection } from './collection';

type Crew = {
  role: string;
  people: {
    name: string;
    comment: string;
  }[];
};

type CastType = {
  actor: Actor;
  character: {
    name: string;
    image: string | null;
  };
};

type Nomination = {
  title: string;
  actor: Actor | null;
  comment: string | null;
};

type FilmAward = {
  award: Pick<AwardData, '_id' | 'title' | 'image'>;
  nominations: Nomination[];
};

type Chapter = {
  title: string;
  part: number;
};

type SeasonType = {
  number: number;
  episodesCount: number;
  releaseDate: string;
};

type SeriesExtension = {
  episodesTotal: number;
  seasons: SeasonType[];
};

type FilmDescription = {
  title: string | null;
  text: string;
};

type IncludedCollection = {
  collection: Pick<Collection, '_id' | 'title'>;
  order: number;
};

type FilmData = {
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
};

type FilmsListItem = Pick<FilmData, '_id' | 'title' | 'poster' | 'releaseDate'>;

type FilmLinkItem = Pick<FilmData, '_id' | 'title'>;

type FilmSearchResult = Pick<
  FilmData,
  '_id' | 'title' | 'genres' | 'poster' | 'releaseDate'
>;

type AdditionalActorData = {
  type: 'actor';
  data: Actor;
};

type AdditionalCrewInfo = {
  type: 'crew';
  data: {
    role: string;
    name: string;
  };
};

type AdditionalCollectionInfo = {
  type: 'collection';
  data: Collection;
};

type AdditionalAwardsInfo = {
  type: 'awards';
  data: Omit<AwardData, 'nominations'>[];
};

type AdditionalInfo =
  | AdditionalActorData
  | AdditionalCrewInfo
  | AdditionalCollectionInfo
  | AdditionalAwardsInfo;

type FilmsListResponse = {
  films: FilmsListItem[];
  total: number;
  additionalInfo: AdditionalInfo | null;
};

type FilmsListPagination = {
  pageIndex?: number;
};

type RandomFilmsList = Pick<FilmData, '_id' | 'title' | 'poster'>[];

type FilmsListFilters = FilmsListPagination &
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

export type {
  FilmData,
  Crew,
  CastType,
  Collection,
  FilmAward,
  Chapter,
  SeriesExtension,
  SeasonType,
  FilmDescription,
  FilmsListItem,
  FilmsListResponse,
  FilmsListFilters,
  FilmLinkItem,
  RandomFilmsList,
  FilmSearchResult,
  AdditionalInfo,
};
