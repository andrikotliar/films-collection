import { ConfigOption, SortingDirection } from '@/types';

export type SortingDirectionOption = ConfigOption<SortingDirection>;

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
