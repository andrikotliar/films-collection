import type { TPersonRole } from '@films-collection/shared';
import type { Award, FilmPerson, Nomination, Person } from '~/database/schema';

export type PickBaseData<T extends { id: number; title: string }> = Pick<T, 'id' | 'title'>;
export type Timestamps = 'createdAt' | 'updatedAt' | 'deletedAt';
export type GroupedPerson = Pick<Person, 'id' | 'name'> & Pick<FilmPerson, 'details'>;
export type GroupedPeople = {
  [position in TPersonRole]: {
    role: TPersonRole;
    people: GroupedPerson[];
  };
};
export type GroupedNomination = {
  person: Pick<Person, 'id' | 'name'> | null;
};
export type GroupedAwards = {
  [awardId: number]: {
    award: Pick<Award, 'id' | 'title'>;
    nominations: Array<Pick<Nomination, 'title'> & GroupedNomination>;
  };
};
