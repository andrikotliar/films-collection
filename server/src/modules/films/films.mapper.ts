import { Prisma } from '@prisma/client';
import { FilmWithRelations, GroupedAwards, GroupedCrew } from './types';
import { FilmsAdminQuery, FilmsQuery } from './schemas';

const MONEY_RANGE_MILLIONS = 10_000_000;

export const FilmsMapper = {
  mapListFilters(plainFilters: FilmsQuery) {
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
      crewMemberId,
      crewMemberPosition,
      actorId,
      awardId,
      style,
      budget,
      boxOffice,
      ids,
    } = plainFilters;

    const filters: Prisma.FilmWhereInput = {
      draft: false,
    };

    if (ids) {
      filters.id = {
        in: ids,
      };
    }

    if (startDate || endDate) {
      filters.releaseDate = {
        gte: startDate && new Date(startDate),
        lte: endDate && new Date(endDate),
      };
    }

    if (type) {
      filters.type = type;
    }

    if (style) {
      filters.style = style;
    }

    if (genreIds) {
      filters.genres = {
        some: {
          genreId: {
            in: genreIds,
          },
        },
      };
    }

    if (studioIds) {
      filters.studios = {
        some: {
          studioId: {
            in: studioIds,
          },
        },
      };
    }

    if (countryIds) {
      filters.countries = {
        some: {
          countryId: {
            in: countryIds,
          },
        },
      };
    }

    if (collectionId) {
      filters.collections = {
        some: {
          collectionId,
        },
      };
    }

    if (rating) {
      filters.rating = rating;
    }

    if (duration) {
      filters.duration = duration;
    }

    if (seasonsTotal || episodesTotal) {
      filters.seriesExtension = {
        seasonsTotal,
        episodesTotal,
      };
    }

    if (crewMemberId && crewMemberPosition) {
      filters.crew = {
        some: {
          AND: {
            position: crewMemberPosition,
            personId: crewMemberId,
          },
        },
      };
    }

    if (actorId) {
      filters.cast = {
        some: {
          personId: actorId,
        },
      };
    }

    if (awardId) {
      filters.awards = {
        some: {
          awardId,
        },
      };
    }

    if (budget) {
      filters.budget = this.getMoneyRangeFilter(budget);
    }

    if (boxOffice) {
      filters.boxOffice = this.getMoneyRangeFilter(boxOffice);
    }

    return filters;
  },

  mapFilmDetails(film: FilmWithRelations) {
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
      genres: this.mapNestedRelations(film.genres, 'genre'),
      countries: this.mapNestedRelations(film.countries, 'country'),
      studios: this.mapNestedRelations(film.studios, 'studio'),
      collections: this.mapNestedRelations(film.collections, 'collection'),
      crew: Object.values(crew),
      awards: Object.values(awards),
    };
  },

  mapNestedRelations<T extends Record<string, unknown>>(
    values: T[],
    selector: keyof T,
  ) {
    return values.map((item) => item[selector]);
  },

  getMoneyRangeFilter(value: number) {
    if (value < MONEY_RANGE_MILLIONS) {
      return {
        lte: value + MONEY_RANGE_MILLIONS,
        gte: 0,
      };
    }

    return {
      lte: value + MONEY_RANGE_MILLIONS,
      gte: value - MONEY_RANGE_MILLIONS,
    };
  },

  mapAdminListFilters(plainFilters: FilmsAdminQuery) {
    const filters: Prisma.FilmWhereInput = {};

    if (plainFilters.q) {
      filters.title = {
        contains: plainFilters.q,
        mode: 'insensitive',
      };
    }

    return filters;
  },
};
