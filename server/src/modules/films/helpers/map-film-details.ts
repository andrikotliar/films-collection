import { FilmWithRelations, GroupedAwards, GroupedCrew } from '../types';

const mapNestedRelations = <T extends Record<string, unknown>>(
  values: T[],
  selector: keyof T,
) => {
  return values.map((item) => item[selector]);
};

export const mapFilmDetails = (film: FilmWithRelations) => {
  const crew = film.crew.reduce((result, person) => {
    if (!result[person.position]) {
      result[person.position] = { position: person.position, people: [] };
    }

    result[person.position].people.push({
      ...person.person,
      comment: person.comment,
    });

    return result;
  }, {} as GroupedCrew);

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
    crew: Object.values(crew),
    awards: Object.values(awards),
  };
};
