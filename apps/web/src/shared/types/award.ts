import { type ListOption } from './list-option';
import { type Person } from './person';

export type Award = {
  id: number;
  title: string;
  description: string | null;
};

export type Nomination = {
  id: number;
  title: string;
  person: Person | null;
  comment: null;
  shouldIncludeActor: boolean;
};

export type AwardNomination = ListOption<number> & {
  shouldIncludeActor: boolean;
};
