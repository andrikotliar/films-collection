import { apiClient } from '@/services';
import { PendingFilm } from '@/types';
import { queryOptions } from '@tanstack/react-query';

export const fetchPendingFilmsListQuery = () => {
  return queryOptions({
    queryKey: ['pending-films'],
    queryFn: () => {
      return apiClient.get<PendingFilm[]>('/pending-films');
    },
  });
};