import { FilmsApi } from '@/api';
import { FILMS_ADMIN_LIST_PER_PAGE } from '@/constants';
import { ManageFilmsQueryFilters } from '@/types/manage-films-filters';
import { queryOptions } from '@tanstack/react-query';

export const fetchAdminListQuery = (params: ManageFilmsQueryFilters) => {
  return queryOptions({
    queryKey: ['admin-list', params] as const,
    queryFn: ({ queryKey }) => {
      const { pageIndex, ...filters } = queryKey[1];

      return FilmsApi.getManageFilmsList({
        ...filters,
        skip: pageIndex ? pageIndex * FILMS_ADMIN_LIST_PER_PAGE : 0,
      });
    },
    retry: false,
  });
};
