import { PendingFilmsApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchPendingFilmQuery = (pendingFilmId?: string) => {
  return queryOptions({
    queryKey: ['pending-film', pendingFilmId] as const,
    queryFn: ({ queryKey }) => {
      if (queryKey[1]) {
        return PendingFilmsApi.getPendingFilm(Number(queryKey[1]));
      }
      return null;
    },
    enabled: Boolean(pendingFilmId),
  });
};
