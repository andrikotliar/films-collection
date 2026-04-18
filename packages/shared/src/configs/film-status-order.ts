import type { FilmStatus } from '~/enums';
import type { Enum } from '~/types';

export const filmStatusOrder: Enum<typeof FilmStatus>[] = ['PLANNED', 'WATCHED', 'ADDED'];
