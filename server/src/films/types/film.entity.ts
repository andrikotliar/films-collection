import { ObjectId } from 'mongoose';
import { PublishStatus } from '../enums';

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

export type FilmData = {
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
  publishStatus: string;
};
