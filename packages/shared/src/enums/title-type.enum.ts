import type { Enum } from '../types/enum.type.js';

export const TitleType = {
  FILM: 'FILM',
  SERIES: 'SERIES',
  ANIMATION: 'ANIMATION',
  ANIMATED_SERIES: 'ANIMATED_SERIES',
} as const;

export type TTitleType = Enum<typeof TitleType>;
