import { Award, PersonRole, TitleType } from '@/enums';
import { RelatedFilms } from './related';

type Crew = {
  role: PersonRole;
  people: {
    name: string;
    comment?: string;
  }[];
};

type CastType = {
  actorId: string;
  character: {
    name: string;
    imageUrl?: string;
  };
};

type Collection = {
  title: string;
  order?: number;
};

type Nomination = {
  title: string;
  actorId?: string;
  comment?: string;
};

type AwardType = {
  awardId: Award;
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
  id: string;
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
  budget?: number;
  boxOffice?: number;
  awards?: AwardType[];
  ordered?: boolean;
  series?: SeriesExtension;
  rating: number;
  relatedTitlesKey?: string;
  related: RelatedFilms;
  watchCount?: number;
  createdAt?: string;
};

type FilmsList = {
  [id: string]: FilmData;
};

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
