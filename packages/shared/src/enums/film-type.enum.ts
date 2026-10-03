import type { Enum } from '../types/enum.type.js';

export const FilmType = {
  FILM: 'FILM',
  SERIES: 'SERIES',
  ANIMATION: 'ANIMATION',
  ANIMATED_SERIES: 'ANIMATED_SERIES',
} as const;

export type TFilmType = Enum<typeof FilmType>;
