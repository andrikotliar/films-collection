import { ListOption } from '@/types/list-option';
import { Person } from '@/types/person';

export type Award = {
  id: number;
  title: string;
  image: string;
  description: string | null;
};

export type Nomination = {
  id: number;
  title: string;
  person: Person | null;
  comment: null;
};

export type AwardNomination = ListOption<number> & {
  shouldIncludeActor: boolean;
};
