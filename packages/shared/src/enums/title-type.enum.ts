import type { Enum } from '~/types/enum.type.js';

export const TitleType = {
  FILM: 'FILM',
  SERIES: 'SERIES',
} as const;

export type TTitleType = Enum<typeof TitleType>;
