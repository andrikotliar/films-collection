import { SelectOption, SortingDirection } from '@/types';

export type SortingDirectionOption = SelectOption<SortingDirection>;

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