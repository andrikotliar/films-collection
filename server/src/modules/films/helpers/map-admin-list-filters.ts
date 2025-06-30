import { Prisma } from '@prisma/client';
import { GetAdminListQuery } from '../schemas';

export const mapAdminListFilters = (plainFilters: GetAdminListQuery) => {
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
