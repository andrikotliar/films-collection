import { ObjectId } from 'mongoose';

type Person = {
  name: string;
  comment: string | null;
};

type Crew = {
  role: string;
  people: Person[];
};

type CastType = {
  actor: string;
  character: {
    name: string;
    imageUrl: string | null;
  };
};

type Collection = {
  collection: string;
  order?: number;
};

type Nomination = {
  title: string;
  actor?: string;
  comment?: string;
};

type FilmAward = {
  award: string;
  nominations: Nomination[];
};

type SeasonType = {
  number: number;
  episodesCount: number;
  releaseDate: string;
};

type SeriesExtension = {
  episodesTotal: number;
  seasons: SeasonType[];
};

type FilmData = {
  _id: ObjectId;
  type: string;
  style: string;
  title: string;
  genres: string[];
  studios: string[];
  crew: Crew[];
  description: string[];
  countries: string[];
  releaseDate: string;
  duration: number;
  cast: CastType[];
  collections: Collection[];
  budget: number | null;
  boxOffice: number | null;
  awards: FilmAward[];
  poster: string;
  trailers: string[];
  seriesExtension: SeriesExtension | null;
  rating: number;
  chaptersId?: string;
  watchCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type {
  FilmData,
  Crew,
  CastType,
  Collection as CollectionType,
  FilmAward,
  SeriesExtension,
  SeasonType,
  Person,
  Nomination,
};
