import type { CreateFilmInput } from '@films-collection/shared';
import type {
  Film,
  FilmAwardNomination,
  FilmCollection,
  FilmCountry,
  FilmGenre,
  FilmPerson,
  FilmStudio,
  FilmTrailer,
  SeriesExtension,
} from '@prisma/client';

type Timestamps = 'createdAt' | 'updatedAt';

type EditableFilm = Omit<Film, Timestamps | 'deletedAt' | 'id'> & {
  collections: Pick<FilmCollection, 'collectionId'>[];
  genres: Pick<FilmGenre, 'genreId'>[];
  countries: Pick<FilmCountry, 'countryId'>[];
  studios: Pick<FilmStudio, 'studioId'>[];
  trailers: Pick<FilmTrailer, 'order' | 'videoId'>[];
  castAndCrew: Omit<FilmPerson, 'filmId' | Timestamps | 'id'>[];
  awards: Omit<FilmAwardNomination, Timestamps | 'filmId' | 'id'>[];
  seriesExtension: SeriesExtension | null;
};

const mapInnerId = <T extends Record<string, number>>(entities: T[], key: keyof T): number[] => {
  return entities.map((item) => item[key]);
};

export const mapAdminFilmDetails = (film: EditableFilm): CreateFilmInput => {
  return {
    ...film,
    genres: mapInnerId(film.genres, 'genreId'),
    countries: mapInnerId(film.countries, 'countryId'),
    studios: mapInnerId(film.studios, 'studioId'),
    collections: mapInnerId(film.collections, 'collectionId'),
    releaseDate: film.releaseDate.toISOString().split('T')[0],
    budget: Number(film.budget),
    boxOffice: Number(film.boxOffice),
    awards: film.awards.map((award) => ({
      ...award,
      personId: award.actorId,
    })),
    description: film.overview,
    isDraft: film.draft,
    seriesExtension: film.seriesExtension
      ? {
          episodesTotal: film.seriesExtension.episodesTotal,
          seasonsTotal: film.seriesExtension.seasonsTotal,
          finishedAt: film.seriesExtension.finishedAt
            ? film.seriesExtension.finishedAt.toString()
            : null,
        }
      : null,
  };
};
