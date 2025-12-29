import type { ListOption, SortingOrder } from '@films-collection/shared';

export type SortingDirectionOption = ListOption<SortingOrder>;

export const sortingDirectionOptions: SortingDirectionOption[] = [
  {
    label: 'ASC',
    value: 'asc',
  },
  {
    label: 'DESC',
    value: 'desc',
  },
];
