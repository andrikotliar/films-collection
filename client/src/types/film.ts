import { Award, PersonRole, TitleType } from '@/enums';
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
  title: string;
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
  genres: string[];
  production: string[];
  crew: Crew[];
  description: string[];
  countries: string[];
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

type FilmsList = Pick<FilmData, '_id' | 'title' | 'media' | 'collections'>;

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
  FilmsList,
};
