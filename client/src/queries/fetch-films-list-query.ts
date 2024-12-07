import { PER_PAGE } from '@/constants';
import { apiClient } from '@/services';
import { FilmsListFilters, FilmsListResponse } from '@/types';
import { queryOptions } from '@tanstack/react-query';

export const fetchFilmsListQuery = (params: FilmsListFilters) => {
  return queryOptions({
    queryKey: ['films-collection-list', params] as const,
    queryFn: ({ queryKey }) => {
      const filters = {
        ...queryKey[1],
        limit: queryKey[1].limit ?? PER_PAGE,
        skip: queryKey[1].skip ? queryKey[1].skip * PER_PAGE : 0,
      };

      return apiClient.get<FilmsListResponse>('/films', filters);
    },
    retry: false,
  });
};
