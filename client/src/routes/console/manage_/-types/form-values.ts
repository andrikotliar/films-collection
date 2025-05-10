import { Person, TitleStyle, TitleType } from '@/types';

export type FormTrailer = {
  videoId: string;
  order: number;
};

export type FormCrew = {
  personId: number;
  name: string;
  position: string;
  comment: string | null;
};

export type FormCast = {
  personId: number;
  name: string;
  characterName: string;
};

export type FormAward = {
  awardId: number | null;
  nominationId: number | null;
  person: Person | null;
  comment: number | null;
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
  chapterKey: string | null;
  chapterOrder: number | null;
  crew: FormCrew[];
  cast: FormCast[];
  awards: FormAward[];
  trailers: FormTrailer[];
  shouldUseExistingKey: boolean;
};
