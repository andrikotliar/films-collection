import type { Prisma } from '@prisma/client';
import type { GetAdminListQuery } from '@films-collection/shared';

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
