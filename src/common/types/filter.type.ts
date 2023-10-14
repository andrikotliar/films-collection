import { FilmData } from '@/common/types/film.type';

export type Filter = {
  title: string;
  property: keyof FilmData;
  options: (string | number)[];
  defaultOptionTitle?: string;
  isRadio?: true;
  isScrollable?: true;
  isGrid?: true;
};
