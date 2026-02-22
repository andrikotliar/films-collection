import type { GetAdminListQuery } from '@films-collection/shared';
import { ilike, isNull, type SQL } from 'drizzle-orm';
import { films } from '~/database/schema';

export const mapAdminListFilters = ({ q }: GetAdminListQuery): SQL[] => {
  const filters: SQL[] = [isNull(films.deletedAt)];

  if (q) {
    filters.push(ilike(films.title, q));
  }

  return filters;
};
