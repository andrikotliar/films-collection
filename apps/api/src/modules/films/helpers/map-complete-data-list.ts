import { type CompleteDataListItem } from '@films-collection/shared';
import type { Film, FilmPerson, FilmTrailer, Person, SeriesExtension } from '~/database/schema';
import type { Timestamps } from '~/modules/films/types';

type PropertyWithTitle = {
  title: string;
};

type CompleteDataFilm = Omit<Film, 'rating' | 'draft' | 'poster' | 'id' | Timestamps> & {
  genres: Array<{ genre: PropertyWithTitle }>;
  studios: Array<{ studio: PropertyWithTitle }>;
  countries: Array<{ country: PropertyWithTitle }>;
  castAndCrew: Array<
    Pick<FilmPerson, 'role' | 'details'> & {
      person: Pick<Person, 'name'>;
    }
  >;
  awards: Array<{
    award: PropertyWithTitle;
    nomination: PropertyWithTitle;
  }>;
  seriesExtensions: Array<Pick<SeriesExtension, 'seasonsTotal' | 'episodesTotal' | 'finishedAt'>>;
  trailers: Array<Omit<FilmTrailer, 'id' | Timestamps | 'filmId'>>;
};

type GroupedAwards = {
  [awardTitle: string]: {
    title: string;
    nominations: string[];
  };
};

const mapIndividualFilm = (film: CompleteDataFilm): CompleteDataListItem => {
  const awards = film.awards.reduce((result, award) => {
    if (!result[award.award.title]) {
      result[award.award.title] = {
        title: award.award.title,
        nominations: [],
      };
    }

    result[award.award.title].nominations.push(award.nomination.title);

    return result;
  }, {} as GroupedAwards);

  const castAndCrew = film.castAndCrew.map((person) => ({
    name: person.person.name,
    role: person.role,
    details: person.details,
  }));

  return {
    ...film,
    genres: film.genres.map((item) => item.genre.title),
    countries: film.countries.map((item) => item.country.title),
    studios: film.studios.map((item) => item.studio.title),
    awards: Object.values(awards),
    castAndCrew,
    seriesExtension: film.seriesExtensions.length
      ? {
          seasonsTotal: film.seriesExtensions[0].seasonsTotal,
          episodesTotal: film.seriesExtensions[0].episodesTotal,
          finishedAt: film.seriesExtensions[0].finishedAt?.split('T')[0] ?? null,
        }
      : undefined,
  };
};

export const mapCompleteDataList = (films: CompleteDataFilm[]): CompleteDataListItem[] => {
  return films.map(mapIndividualFilm);
};
