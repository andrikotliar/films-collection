type TypeVariants = 'Film' | 'Animation' | 'Series';

type Crew = {
  role: string;
  people: {
    name: string;
    comment?: string;
  }[];
};

type ActorData = {
  name: string;
  photoUrl: string;
};

type CastType = {
  actorId: string;
  character: {
    name: string;
    imageUrl: string | null;
  };
} & ActorData;

type Collection = {
  title: string;
  order?: number;
};

type Award = {
  title: string;
  nominations: string[];
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
  chapters?: Chapter;
  awards?: Award[];
  ordered?: boolean;
  series?: SeriesExtension;
  rating: number;
};

export type {
  TypeVariants,
  FilmData,
  Crew,
  CastType,
  ActorData,
  Collection,
  Award,
  Chapter,
  SeriesExtension,
  SeasonType,
  MediaItem,
};
