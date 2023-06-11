type TypeVariants = "Film" | "Animation" | "Series";

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
}

type MoneyValue = {
  value: number;
  suffix: string;
}

type Collection = {
  title: string;
  order?: number;
}

type Award = {
  title: string;
  nominations: string[];
}

type Chapter = {
  title: string;
  part: number;
}

type Season = {
  season: number;
  trailer: string;
  poster: string;
  year: number;
  episodes: {
    episodeOverall: number;
    episode: number;
    title: string;
  }[];
}

type FilmData = {
  id: string;
  type: TypeVariants[];
  poster: string;
  trailer?: string;
  title: string;
  genres: string[];
  production: string[];
  crew: Crew[];
  synopsis: string;
  countries: string[];
  year: number;
  duration: number;
  cast: Cast[];
  collections: Collection[];
  budget?: MoneyValue;
  boxoffice?: MoneyValue;
  parts?: Chapter;
  awards?: Award[];
  seasons?: Season[];
  ordered?: boolean;
};

export type {
  FilmData,
  Crew,
  Cast,
  MoneyValue,
  Collection,
  Award,
  Chapter,
  Season,
}