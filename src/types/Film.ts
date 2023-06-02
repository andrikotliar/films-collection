type Type = "Film" | "Animation" | "Series";

type Cast = {
  actorId: string;
  character: {
    name: string;
    imageUrl: string;
    description?: string; // deprecated
  };
}

type MoneyValue = {
  value: number;
  suffix: string;
}

type Collection = {
  name: string;
  order: number;
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
  episodes: {
    episodeOverall: number;
    episode: number;
    title: string;
    directedBy: string;
    writtenBy: string;
  }[];
  trailer: string;
}

type FilmType = {
  id: string;
  type: Type;
  title: string;
  poster: string;
  genres: string[];
  production: string[];
  directedBy: string[];
  producedBy: string;
  writtenBy: string;
  musicBy: string;
  cinematographyBy?: string;
  countries: string[];
  budget?: MoneyValue;
  boxoffice?: MoneyValue;
  synopsis: string;
  collections: Collection[];
  awards?: Award[];
  cast: Cast[];
  duration: number;
  trailer: string;
  parts?: Chapter;
  year: number;
  seasons?: Season[]
};

export type {
  FilmType,
  Type,
  Cast,
  MoneyValue,
  Collection,
  Award,
  Chapter,
  Season,
}