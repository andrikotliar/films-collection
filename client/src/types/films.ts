import { Award, Country, Genre, PersonRole, Studio, TitleType } from '@/enums';
import { Actor } from './actor';

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
  key: string;
  order: number | null;
};

type Nomination = {
  title: string;
  actor: Actor | null;
  comment: string | null;
};

type AwardType = {
  awardKey: Award;
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
};

type SeriesExtension = {
  episodesTotal: number;
  seasons: SeasonType[];
};

type MediaItem = {
  poster: string;
  trailer: string;
};

type FilmData = {
  _id: string;
  type: TitleType[];
  media: MediaItem[];
  title: string;
  genres: Genre[];
  studios: Studio[];
  crew: Crew[];
  description: string[];
  countries: Country[];
  releaseDate: string[];
  duration: number;
  cast: CastType[];
  collections: Collection[];
  budget: number | null;
  boxOffice: number | null;
  awards: AwardType[];
  seriesExtension: SeriesExtension | null;
  rating: number;
  chapters: Pick<FilmData, '_id' | 'title' | 'media'>[];
  watchCount: number;
  createdAt: string;
  updatedAt: string;
};

type FilmsListItem = Pick<
  FilmData,
  '_id' | 'title' | 'media' | 'collections' | 'releaseDate'
>;

type FilmLinkItem = Pick<FilmData, '_id' | 'title'>;

type FilmsListResponse = {
  films: FilmsListItem[];
  total: number;
};

type FilmsListPagination = {
  limit: number;
  skip: number;
};

type RandomFilmsList = Pick<FilmData, '_id' | 'title' | 'media'>[];

type FilmsListFilters = FilmsListPagination &
  Partial<{
    type: TitleType[];
    genre: Genre[];
    startDate: string;
    endDate: string;
    country: Country[];
    studio: Studio[];
    isLatestAdded: boolean;
    collection: Collection[];
  }>;

export type {
  FilmData,
  Crew,
  CastType,
  Collection,
  AwardType,
  Chapter,
  SeriesExtension,
  SeasonType,
  MediaItem,
  FilmsListItem,
  FilmsListResponse,
  FilmsListFilters,
  FilmLinkItem,
  RandomFilmsList,
};
