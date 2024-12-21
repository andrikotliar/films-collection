import { PendingFilmsApi } from '@/api';
import { PendingFilmQueryFilters } from '@/types';
import { queryOptions } from '@tanstack/react-query';

export const fetchPendingFilmsListQuery = (params: PendingFilmQueryFilters) => {
  return queryOptions({
    queryKey: ['pending-films', params] as const,
    queryFn: ({ queryKey }) => {
      return PendingFilmsApi.getPendingFilms(queryKey[1]);
    },
  });
};
