import type {
  Person,
  FilmPerson,
  PersonRole,
  FilmAwardNomination,
  Award,
  Nomination,
} from '@prisma/client';

type GropedPerson = Pick<Person, 'id' | 'name'> & Pick<FilmPerson, 'comment' | 'details'>;

export type GroupedPeople = {
  [position in PersonRole]: {
    role: PersonRole;
    people: GropedPerson[];
  };
};

export type GroupedNomination = Pick<FilmAwardNomination, 'comment'> & {
  person: Pick<Person, 'id' | 'name'> | null;
};

export type GroupedAwards = {
  [awardId: number]: {
    award: Pick<Award, 'id' | 'title'>;
    nominations: Array<Pick<Nomination, 'title'> & GroupedNomination>;
  };
};

const mapNestedRelations = <T extends Record<string, unknown>>(values: T[], selector: keyof T) => {
  return values.map((item) => item[selector]);
};

const rolesOrder: Record<PersonRole, number> = {
  CREATOR: 1,
  DIRECTOR: 2,
  WRITER: 3,
  PRODUCER: 4,
  COMPOSER: 5,
  CAMERAMAN: 6,
  ACTOR: 7,
};

const sortGroupedPeople = (castAndCrew: GroupedPeople) => {
  return Object.values(castAndCrew).sort((a, b) => {
    return rolesOrder[a.role] - rolesOrder[b.role];
  });
};

export const mapFilmDetails = (film: Record<string, any>) => {
  const castAndCrew = film.castAndCrew.reduce(
    (
      result: GroupedPeople,
      {
        role,
        details,
        comment,
        person,
      }: { role: PersonRole; details: string; comment: string | null; person: Person },
    ) => {
      if (!result[role]) {
        result[role] = { role, people: [] };
      }

      result[role].people.push({
        ...person,
        comment,
        details,
      });

      return result;
    },
    {} as GroupedPeople,
  );

  const awards = film.awards.reduce(
    (
      result: GroupedAwards,
      award: { award: Award; nomination: Nomination; comment: string; person: Person },
    ) => {
      if (!result[award.award.id]) {
        result[award.award.id] = {
          award: award.award,
          nominations: [],
        };
      }

      result[award.award.id].nominations.push({
        title: award.nomination.title,
        comment: award.comment,
        person: award.person,
      });

      return result;
    },
    {} as GroupedAwards,
  );

  return {
    ...film,
    description: film.overview?.text ?? null,
    budget: film.budget ? Number(film.budget) : null,
    boxOffice: film.boxOffice ? Number(film.boxOffice) : null,
    genres: mapNestedRelations(film.genres, 'genre'),
    countries: mapNestedRelations(film.countries, 'country'),
    studios: mapNestedRelations(film.studios, 'studio'),
    collections: mapNestedRelations(film.collections, 'collection'),
    castAndCrew: sortGroupedPeople(castAndCrew),
    awards: Object.values(awards),
  };
};
