import {
  convertEnumValueToLabel,
  getFormattedMoneyValue,
  type CompleteDataListResponse,
} from '@films-collection/shared';
import sanitize from 'sanitize-html';
import type { Film, FilmPerson, Person, SeriesExtension } from '~/database/schema';
import type { Timestamps } from '~/modules/films/types';

type PropertyWithTitle = {
  title: string;
};

type CompleteDataFilm = Omit<
  Film,
  'rating' | 'chapterOrder' | 'chapterKey' | 'draft' | 'poster' | 'id' | Timestamps
> & {
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
};

type GroupedAwards = {
  [awardTitle: string]: {
    title: string;
    nominations: string[];
  };
};

const mapIndividualFilm = (film: CompleteDataFilm): CompleteDataListResponse => {
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

  const crew = film.castAndCrew
    .filter((person) => person.role !== 'ACTOR')
    .map((person) => ({
      name: person.person.name,
      role: convertEnumValueToLabel(person.role),
    }));

  const cast = film.castAndCrew
    .filter((person) => person.role === 'ACTOR')
    .map((person) => ({
      name: person.person.name,
      character: person.details ?? '',
    }));

  return {
    title: film.title,
    type: convertEnumValueToLabel(film.type),
    style: convertEnumValueToLabel(film.style),
    genres: film.genres.map((item) => item.genre.title),
    duration: `${film.duration} min`,
    releaseDate: film.releaseDate.split('T')[0],
    overview: film.overview ? sanitize(film.overview, { allowedTags: [] }) : '',
    crew,
    cast,
    budget: getFormattedMoneyValue(film.budget),
    boxOffice: getFormattedMoneyValue(film.boxOffice),
    countries: film.countries.map((item) => item.country.title),
    studios: film.studios.map((item) => item.studio.title),
    summary: film.seriesExtensions.length
      ? {
          seasonsTotal: film.seriesExtensions[0].seasonsTotal,
          episodesTotal: film.seriesExtensions[0].episodesTotal,
          finishedAt: film.seriesExtensions[0].finishedAt?.split('T')[0] ?? null,
        }
      : undefined,
    awards: Object.values(awards),
  };
};

export const mapCompleteDataList = (films: CompleteDataFilm[]): CompleteDataListResponse[] => {
  return films.map(mapIndividualFilm);
};
