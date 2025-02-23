import { Person } from '@/types/person';

export type Award = {
  id: number;
  title: string;
  image: string;
  description: string;
};

export type Nomination = {
  id: number;
  title: string;
  person: Person | null;
  comment: null;
};
