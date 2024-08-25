import { PersonRole } from '@/common/enums';
import { RelatedFilms } from './related';

type TypeVariants = 'Film' | 'Animation' | 'Series';

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
  nominationId: string;
  actorId?: string;
  comment?: string;
};

type Award = {
  awardId: string;
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
  type: TypeVariants[];
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
  awards?: Award[];
  ordered?: boolean;
  series?: SeriesExtension;
  rating: number;
  relatedTitlesKey?: string;
  related: RelatedFilms;
  watchCount?: number;
};

type FilmsList = {
  [id: string]: FilmData;
};

export type {
  TypeVariants,
  FilmData,
  Crew,
  CastType,
  Collection,
  Award,
  Chapter,
  SeriesExtension,
  SeasonType,
  MediaItem,
  FilmsList,
};
