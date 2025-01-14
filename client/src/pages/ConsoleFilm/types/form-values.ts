import { TitleType } from '@/enums';
import { FilmDescription } from '@/types';

export type FormValues = {
  title: string | null;
  type: TitleType;
  style: string;
  poster: string | null;
  trailer: string | null;
  rating: number;
  watchCount: number;
  isDraft: boolean;
  budget: number;
  boxOffice: number;
  runtime: number;
  releaseDate: string | null;
  genres: string[];
  countries: string[];
  collections: string[];
  studios: string[];
  description: FilmDescription[];
};
