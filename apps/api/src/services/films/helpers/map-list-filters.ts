import type { GetFilmsListQuery } from '@films-collection/shared';
import { and, between, eq, exists, gte, inArray, isNull, lte, sql, type SQL } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';
import {
  filmAwardNominations,
  films,
  filmsCollections,
  filmsCountries,
  filmsGenres,
  filmsPeople,
  filmsStudios,
  seriesExtensions,
} from '~/database/schema';
import type { Database } from '~/plugins';

const MONEY_RANGE_MILLIONS = 10_000_000;

const getMoneyRangeFilter = (column: PgColumn, value: number) => {
  if (value < MONEY_RANGE_MILLIONS) {
    return between(column, 0, value + MONEY_RANGE_MILLIONS);
  }

  return between(column, value - MONEY_RANGE_MILLIONS, value + MONEY_RANGE_MILLIONS);
};

export const mapListFilters = (plainFilters: GetFilmsListQuery, db: Database): SQL[] => {
  const {
    genreIds,
    collectionId,
    studioIds,
    countryIds,
    type,
    startDate,
    endDate,
    rating,
    seasonsTotal,
    episodesTotal,
    duration,
    personId,
    personRole,
    awardId,
    style,
    budget,
    boxOffice,
  } = plainFilters;

  const filters: SQL[] = [eq(films.draft, sql`false`), isNull(films.deletedAt)];

  if (startDate) {
    filters.push(gte(films.releaseDate, startDate));
  }

  if (endDate) {
    filters.push(lte(films.releaseDate, endDate));
  }

  if (type) {
    filters.push(eq(films.type, type));
  }

  if (style) {
    filters.push(eq(films.style, style));
  }

  if (genreIds) {
    filters.push(
      exists(
        db
          .select()
          .from(filmsGenres)
          .where(and(eq(films.id, filmsGenres.filmId), inArray(filmsGenres.genreId, genreIds))),
      ),
    );
  }

  if (studioIds) {
    filters.push(
      exists(
        db
          .select()
          .from(filmsStudios)
          .where(and(eq(films.id, filmsStudios.filmId), inArray(filmsStudios.studioId, studioIds))),
      ),
    );
  }

  if (countryIds) {
    filters.push(
      exists(
        db
          .select()
          .from(filmsStudios)
          .where(
            and(eq(films.id, filmsCountries.filmId), inArray(filmsCountries.countryId, countryIds)),
          ),
      ),
    );
  }

  if (collectionId) {
    filters.push(
      exists(
        db
          .select()
          .from(filmsCollections)
          .where(
            and(
              eq(films.id, filmsCollections.filmId),
              eq(filmsCollections.collectionId, collectionId),
            ),
          ),
      ),
    );
  }

  if (rating) {
    filters.push(eq(films.rating, rating));
  }

  if (duration) {
    filters.push(eq(films.duration, duration));
  }

  if (seasonsTotal) {
    filters.push(
      exists(
        db
          .select()
          .from(seriesExtensions)
          .where(
            and(
              eq(films.id, seriesExtensions.filmId),
              eq(seriesExtensions.seasonsTotal, seasonsTotal),
            ),
          ),
      ),
    );
  }

  if (episodesTotal) {
    filters.push(
      exists(
        db
          .select()
          .from(seriesExtensions)
          .where(
            and(
              eq(films.id, seriesExtensions.filmId),
              eq(seriesExtensions.episodesTotal, episodesTotal),
            ),
          ),
      ),
    );
  }

  if (personId && personRole) {
    filters.push(
      exists(
        db
          .select()
          .from(filmsPeople)
          .where(
            and(
              eq(filmsPeople.filmId, films.id),
              eq(filmsPeople.personId, personId),
              eq(filmsPeople.role, personRole),
            ),
          ),
      ),
    );
  }

  if (awardId) {
    filters.push(
      exists(
        db
          .select()
          .from(filmAwardNominations)
          .where(
            and(
              eq(films.id, filmAwardNominations.filmId),
              eq(filmAwardNominations.awardId, awardId),
            ),
          ),
      ),
    );
  }

  if (budget) {
    filters.push(getMoneyRangeFilter(films.budget, budget));
  }

  if (boxOffice) {
    filters.push(getMoneyRangeFilter(films.boxOffice, boxOffice));
  }

  return filters;
};
