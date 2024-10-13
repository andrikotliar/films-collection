import {
  Country,
  Genre,
  PersonRole,
  Studio,
  TitleType,
  Collection as CollectionEnum,
  StyleType,
} from '@/enums';
import { Actor } from './actor';
import { AwardData } from './award';

type Crew = {
  role: PersonRole;
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

type Collection = {
  key: CollectionEnum;
  order: number | null;
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
  title: string;
  number: number;
  episodesCount: number;
  releaseDate: string;
  trailer: string;
};

type SeriesExtension = {
  episodesTotal: number;
  seasons: SeasonType[];
};

type FilmDescription = {
  title: string | null;
  text: string;
};

type FilmData = {
  _id: string;
  type: TitleType;
  style: StyleType;
  title: string;
  genres: Genre[];
  studios: Studio[];
  crew: Crew[];
  description: FilmDescription[];
  countries: Country[];
  releaseDate: string;
  duration: number;
  cast: CastType[];
  collections: Collection[];
  budget: number | null;
  boxOffice: number | null;
  awards: FilmAward[];
  seriesExtension: SeriesExtension | null;
  rating: number;
  poster: string;
  trailer?: string;
  chapters: Pick<FilmData, '_id' | 'title' | 'poster'>[];
  watchCount: number;
  createdAt: string;
  updatedAt: string;
};

type FilmsListItem = Pick<
  FilmData,
  '_id' | 'title' | 'poster' | 'collections' | 'releaseDate'
>;

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
    role: PersonRole;
    name: string;
  };
};

type AdditionalCollectionInfo = {
  type: 'collection';
  data: CollectionEnum;
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
  limit: number;
  skip: number;
};

type RandomFilmsList = Pick<FilmData, '_id' | 'title' | 'poster'>[];

type FilmsListFilters = FilmsListPagination &
  Partial<{
    type: TitleType[];
    genre: Genre[];
    startDate: string;
    endDate: string;
    country: Country[];
    studio: Studio[];
    collection: Collection[];
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
