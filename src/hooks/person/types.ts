import { PersonRole } from '@/common/enums';
import { FilmData } from '@/common/types';

type Person = {
  position: string;
  name: string;
};

type Values = {
  films: FilmData[];
  totalFilmsCount: number;
  pagesCount: number;
  genres: string[];
  years: string[];
  person: Person | null;
};

type FilterFilmsOptions = {
  role: PersonRole;
  currentId: string;
  films: FilmData[];
};

export type { Person, Values, FilterFilmsOptions };
