import { ListOption, SortingOrder } from '../types';

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
