import { FilmData } from '@/common/types';

type FilterKeys = 'general' | 'collections';

type FilterItem = {
  title: string;
  property: keyof FilmData;
  options: (string | number)[];
  defaultOptionTitle?: string;
  isRadio?: true;
  isScrollable?: true;
  isGrid?: true;
};

type Filters = {
  [key in FilterKeys]: FilterItem[];
};

export type { FilterItem, Filters };
