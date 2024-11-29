import { apiClient } from '@/services';
import { FilmsListFilters, FilmsListResponse } from '@/types';
import { queryOptions } from '@tanstack/react-query';

const createFilmsListQuery = (params: FilmsListFilters) => {
  return queryOptions({
    queryKey: ['films-collection-list', params] as const,
    queryFn: ({ queryKey }) => {
      return apiClient.get<FilmsListResponse>('/films', queryKey[1]);
    },
    retry: false,
  });
};

export { createFilmsListQuery };
