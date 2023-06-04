type FilmType = "Film" | "Animation";
type SeriesType = "Series" | "Animation";

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
  name: string;
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
  episodes: {
    episodeOverall: number;
    episode: number;
    title: string;
    directedBy: string;
    writtenBy: string;
  }[];
  trailer: string;
}

type BaseFilmData = {
  id: string;
  title: string;
  poster: string;
  genres: string[];
  production: string[];
  directedBy: string[];
  producedBy: string;
  writtenBy: string;
  musicBy: string;
  cinematographyBy?: string;
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
  ordered?: boolean;
};

type FilmData = BaseFilmData & {
  type: FilmType;
  trailer: string;
};

type SeriesData = BaseFilmData & {
  type: SeriesType;
  seasons: Season[];
}

type GeneralFilm = FilmData | SeriesData;

export type {
  FilmType,
  SeriesType,
  FilmData,
  SeriesData,
  GeneralFilm,
  Cast,
  MoneyValue,
  Collection,
  Award,
  Chapter,
  Season,
}