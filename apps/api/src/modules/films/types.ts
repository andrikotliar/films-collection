import type { Award, FilmPerson, Nomination, Person, PersonRole } from '~/database/schema';

export type PickBaseData<T extends { id: number; title: string }> = Pick<T, 'id' | 'title'>;
export type Timestamps = 'createdAt' | 'updatedAt' | 'deletedAt';
export type GroupedPerson = Pick<Person, 'id' | 'name'> & Pick<FilmPerson, 'details'>;
export type GroupedPeople = {
  [position in PersonRole]: {
    role: PersonRole;
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
