import { FilmsApi } from '~/api';
import { FILMS_ADMIN_LIST_PER_PAGE } from '../constants';
import { queryOptions } from '@tanstack/react-query';
import { type AdminFilmsQueryFilters } from '../types';
import { queryKeys } from '~/common/configs';

export const fetchAdminListQuery = (params: AdminFilmsQueryFilters) => {
  return queryOptions({
    queryKey: [queryKeys.films.adminList, params] as const,
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
