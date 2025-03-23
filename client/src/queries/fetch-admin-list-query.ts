import { FilmsApi } from '@/api';
import { FILMS_ADMIN_LIST_PER_PAGE } from '@/constants';
import { AdminFilmsQueryFilters } from '@/types';
import { queryOptions } from '@tanstack/react-query';

export const fetchAdminListQuery = (params: AdminFilmsQueryFilters) => {
  return queryOptions({
    queryKey: ['admin-list', params] as const,
    queryFn: ({ queryKey }) => {
      const { pageIndex, ...filters } = queryKey[1];

      return FilmsApi.getAdminFilmsList({
        ...filters,
        skip: pageIndex ? pageIndex * FILMS_ADMIN_LIST_PER_PAGE : 0,
      });
    },
    retry: false,
  });
};
