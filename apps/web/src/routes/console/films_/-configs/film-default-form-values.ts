import type z from 'zod';
import { NEW_ITEM_ID } from '@films-collection/shared';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';
import { getTodayString } from '~/shared';

export const filmDefaultFormValues: z.infer<typeof FilmFormSchema> = {
  id: NEW_ITEM_ID,
  title: '',
  type: 'FILM',
  style: 'LIVE_ACTION',
  poster: '',
  rating: 1,
  isDraft: false,
  budget: 0,
  boxOffice: 0,
  duration: 0,
  releaseDate: getTodayString(),
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
  seriesExtension: null,
};
