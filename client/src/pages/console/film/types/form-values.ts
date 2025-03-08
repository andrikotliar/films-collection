import { TitleStyle, TitleType } from '@/types';

export type FormValues = {
  title: string | null;
  type: TitleType;
  style: TitleStyle;
  poster: string | null;
  youtubeVideoId: string | null;
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
  description: string;
};
