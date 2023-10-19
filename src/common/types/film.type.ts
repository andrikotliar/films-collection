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

type Summary = {
  title?: string;
  text: string;
};

type SeasonType = {
  number: number;
  poster: string;
  trailer: string;
  year: number;
  episodesCount: number;
};

type SeriesExtension = {
  episodesTotal: number;
  seasons: SeasonType[];
};

type FilmData = {
  id: string;
  type: TypeVariants[];
  poster: string;
  trailer?: string;
  title: string;
  genres: string[];
  production: string[];
  crew: Crew[];
  summary: {
    sections: Summary[];
  };
  countries: string[];
  year: number;
  duration: number;
  cast: CastType[];
  collections: Collection[];
  budget?: number;
  boxOffice?: number;
  chapters?: Chapter;
  awards?: Award[];
  ordered?: boolean;
  series?: SeriesExtension;
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
  Summary,
  SeriesExtension,
  SeasonType,
};
