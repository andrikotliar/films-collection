import { type TitleStyle, type TitleType, type MixedId } from '@/common';

export type FormTrailer = {
  videoId: string;
  order: number;
};

export type FormPerson = {
  personId: number | null;
  role: string;
  comment: string | null;
  details: string | null;
};

export type FormAward = {
  awardId: number | null;
  nominationId: number | null;
  personId: number | null;
  comment: number | null;
};

export type FilmFormValues = {
  id: MixedId;
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
  genres: number[];
  countries: number[];
  collections: number[];
  studios: number[];
  description: string | null;
  chapterKey: string | null;
  chapterOrder: number | null;
  castAndCrew: FormPerson[];
  awards: FormAward[];
  trailers: FormTrailer[];
  shouldUseExistingKey: boolean;
  pendingFilmId?: number;
};
