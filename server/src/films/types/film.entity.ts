import { ObjectId } from 'mongoose';

export type Person = {
  name: string;
  comment: string | null;
};

export type Crew = {
  role: string;
  people: Person[];
};

export type CastType = {
  actor: string;
  character: {
    name: string;
    imageUrl: string | null;
  };
};

export type Collection = {
  collection: string;
  order?: number;
};

export type Nomination = {
  title: string;
  actor?: string;
  comment?: string;
};

export type FilmAward = {
  award: string;
  nominations: Nomination[];
};

export type SeasonType = {
  number: number;
  episodesCount: number;
  releaseDate: string;
};

export type SeriesExtension = {
  episodesTotal: number;
  seasons: SeasonType[];
};

export type FilmDescription = {
  title: string | null;
  text: string;
};

export type FilmData = {
  _id: ObjectId;
  type: string;
  style: string;
  title: string;
  poster: string;
  releaseDate: string;
  publishStatus: string;
  chaptersId: string | null;
  duration: number;
  rating: number;
  watchCount: number;
  budget: number | null;
  boxOffice: number | null;
  genres: string[];
  studios: string[];
  countries: string[];
  trailers: string[];
  crew: Crew[];
  description: FilmDescription[];
  cast: CastType[];
  collections: Collection[];
  awards: FilmAward[];
  seriesExtension: SeriesExtension | null;
  createdAt: Date;
  updatedAt: Date;
};
