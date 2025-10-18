import { FilmsApi } from '@/api';
import { PER_PAGE } from '../constants';
import { type FilmsListFilters } from '../types';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '@/common/configs';

export const fetchFilmsListQuery = (params: FilmsListFilters) => {
  return queryOptions({
    queryKey: [queryKeys.films.list, params] as const,
    queryFn: ({ queryKey }) => {
      const { pageIndex, ...queries } = queryKey[1];

      const filters = {
        ...queries,
        limit: PER_PAGE,
        skip: pageIndex ? pageIndex * PER_PAGE : 0,
      };

      return FilmsApi.getList(filters);
    },
    retry: false,
  });
};
