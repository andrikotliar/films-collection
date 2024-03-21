import { FilmData } from '@/common/types';

type FilterKeys = 'general' | 'collections';

export type FilterItem = {
  title: string;
  property: keyof FilmData;
  options: (string | number)[];
  defaultOptionTitle?: string;
  isRadio?: true;
  isScrollable?: true;
  isGrid?: true;
};

export type Filters = {
  [key in FilterKeys]: FilterItem[];
};
