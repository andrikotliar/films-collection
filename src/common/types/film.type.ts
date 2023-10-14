type TypeVariants = 'Film' | 'Animation' | 'Series';

type Crew = {
  role: string;
  people: {
    name: string;
    comment?: string;
  }[];
};

type Cast = {
  actorId: string;
  character: {
    name: string;
    imageUrl: string;
  };
};

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
  cast: Cast[];
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
  Cast,
  Collection,
  Award,
  Chapter,
  DescriptionType,
  Episode,
};
