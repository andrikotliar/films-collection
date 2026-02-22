import type { FilmResponseSchema } from '@films-collection/shared';
import type z from 'zod';
import type {
  Award,
  Collection,
  Country,
  Film,
  FilmAwardNomination,
  FilmPerson,
  FilmTrailer,
  Genre,
  Nomination,
  Person,
  PersonRole,
  SeriesExtension,
  Studio,
} from '~/database/schema';

type PickBaseData<T extends { id: number; title: string }> = Pick<T, 'id' | 'title'>;

type GroupedPerson = Pick<Person, 'id' | 'name'> & Pick<FilmPerson, 'comment' | 'details'>;

export type GroupedPeople = {
  [position in PersonRole]: {
    role: PersonRole;
    people: GroupedPerson[];
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

type ExtendedFilm = Omit<Film, 'createdAt' | 'updatedAt' | 'style' | 'deletedAt'> & {
  genres: Array<{ genre: PickBaseData<Genre> }>;
  studios: Array<{ studio: PickBaseData<Studio> }>;
  countries: Array<{ country: PickBaseData<Country> }>;
  collections: Array<{ collection: PickBaseData<Collection> }>;
  castAndCrew: Array<
    Pick<FilmPerson, 'role' | 'comment' | 'details'> & {
      person: Pick<Person, 'id' | 'name'>;
    }
  >;
  awards: Array<
    Pick<FilmAwardNomination, 'comment'> & {
      award: Pick<Award, 'id' | 'title'>;
      nomination: Pick<Nomination, 'id' | 'title'>;
      person: Pick<Person, 'id' | 'name'> | null;
    }
  >;
  seriesExtensions: Array<Pick<SeriesExtension, 'seasonsTotal' | 'episodesTotal' | 'finishedAt'>>;
  trailers: FilmTrailer[];
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

export const mapFilmDetails = (
  film: ExtendedFilm,
  chapters: Array<Pick<Film, 'id' | 'title' | 'poster' | 'chapterOrder'>> | null,
): z.infer<typeof FilmResponseSchema> => {
  const castAndCrew = film.castAndCrew.reduce((result, { role, details, comment, person }) => {
    if (!result[role]) {
      result[role] = { role, people: [] };
    }

    result[role].people.push({
      ...person,
      comment,
      details,
    });

    return result;
  }, {} as GroupedPeople);

  const awards = film.awards.reduce((result, award) => {
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
  }, {} as GroupedAwards);

  return {
    ...film,
    budget: film.budget ? Number(film.budget) : null,
    boxOffice: film.boxOffice ? Number(film.boxOffice) : null,
    genres: mapNestedRelations(film.genres, 'genre'),
    countries: mapNestedRelations(film.countries, 'country'),
    studios: mapNestedRelations(film.studios, 'studio'),
    collections: mapNestedRelations(film.collections, 'collection'),
    castAndCrew: sortGroupedPeople(castAndCrew),
    awards: Object.values(awards),
    seriesExtension: film.seriesExtensions[0],
    chapters: chapters ?? [],
  };
};
