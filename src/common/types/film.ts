import { NominationCategory, PersonRole } from '@/common/enums';

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
    imageUrl: string | null;
  };
};

type Collection = {
  title: string;
  order?: number;
};

type Nomination = {
  title: string;
  category: NominationCategory;
  nominee?: string;
  comment?: string;
};

type Award = {
  title: string;
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
  year: number[];
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
};