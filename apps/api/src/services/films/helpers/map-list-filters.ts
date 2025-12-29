import type { Prisma } from '@prisma/client';
import type { GetFilmsListQuery } from '../schemas';

const MONEY_RANGE_MILLIONS = 10_000_000;

const getMoneyRangeFilter = (value: number) => {
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
};

export const mapListFilters = (plainFilters: GetFilmsListQuery) => {
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

  const filters: Prisma.FilmWhereInput = {
    draft: false,
    deletedAt: null,
  };

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
        collectionId: collectionId,
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

  if (personId && personRole) {
    filters.castAndCrew = {
      some: {
        role: personRole,
        personId,
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
    filters.budget = getMoneyRangeFilter(budget);
  }

  if (boxOffice) {
    filters.boxOffice = getMoneyRangeFilter(boxOffice);
  }

  return filters;
};
