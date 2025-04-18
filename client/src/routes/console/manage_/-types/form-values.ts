import { TitleStyle, TitleType } from '@/types';

export type FilmFormTrailer = {
  videoId: string;
  order: number;
};

export type FormValues = {
  title: string | null;
  type: TitleType;
  style: TitleStyle;
  poster: string | File | null;
  rating: number;
  isDraft: boolean;
  budget: number;
  boxOffice: number;
  runtime: number;
  releaseDate: string | null;
  genres: string[];
  countries: string[];
  collections: string[];
  studios: string[];
  description: string | null;
  trailers: FilmFormTrailer[];
};
