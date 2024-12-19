import { apiClient } from '@/services';
import { PendingFilm, PendingFilmQueryFilters } from '@/types';
import { queryOptions } from '@tanstack/react-query';

export const fetchPendingFilmsListQuery = (params: PendingFilmQueryFilters) => {
  return queryOptions({
    queryKey: ['pending-films', params] as const,
    queryFn: ({ queryKey }) => {
      return apiClient.get<PendingFilm[]>('/pending-films', queryKey[1]);
    },
  });
};
