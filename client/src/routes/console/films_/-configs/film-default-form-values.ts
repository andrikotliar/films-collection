import { NEW_ITEM_ID } from '@/common';
import { type FormValues } from '../-types';

export const filmDefaultFormValues: FormValues = {
  id: NEW_ITEM_ID,
  title: null,
  type: 'FILM',
  style: 'LIVE_ACTION',
  poster: null,
  rating: 1,
  isDraft: false,
  budget: 0,
  boxOffice: 0,
  runtime: 0,
  releaseDate: null,
  genres: [],
  studios: [],
  collections: [],
  countries: [],
  description: null,
  chapterKey: null,
  chapterOrder: null,
  castAndCrew: [],
  awards: [],
  trailers: [],
  shouldUseExistingKey: false,
};
