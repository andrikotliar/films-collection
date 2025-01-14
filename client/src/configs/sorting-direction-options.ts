import { ListOption, SortingDirection } from '@/types';

export type SortingDirectionOption = ListOption<SortingDirection>;

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
