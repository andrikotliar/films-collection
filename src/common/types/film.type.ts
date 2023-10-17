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
    imageUrl: string;
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

type Episode = {
  episodeOverall: number;
  episode: number;
  title: string;
};

type DescriptionType = {
  title?: string;
  plot: string;
  episodes: Episode[];
};

type FilmData = {
  id: string;
  type: TypeVariants[];
  posters: string[];
  trailers: string[];
  title: string;
  genres: string[];
  production: string[];
  crew: Crew[];
  description: DescriptionType[];
  countries: string[];
  years: number[];
  duration: number;
  cast: CastType[];
  collections: Collection[];
  budget?: number;
  boxOffice?: number;
  parts?: Chapter;
  awards?: Award[];
  ordered?: boolean;
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
  DescriptionType,
  Episode,
};
