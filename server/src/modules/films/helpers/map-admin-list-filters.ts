import { Prisma } from '@prisma/client';
import { FilmsAdminQuery } from '../schemas';

export const mapAdminListFilters = (plainFilters: FilmsAdminQuery) => {
  const filters: Prisma.FilmWhereInput = {
    deletedAt: null,
  };

  if (plainFilters.q) {
    filters.title = {
      contains: plainFilters.q,
      mode: 'insensitive',
    };
  }

  return filters;
};
