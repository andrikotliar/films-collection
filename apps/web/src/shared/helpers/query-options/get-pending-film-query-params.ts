import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getPendingFilmQueryOptions = (pendingFilmId?: string) => {
  return queryOptions({
    queryKey: [api.pendingFilms.getById, pendingFilmId],
    queryFn: () => {
      if (pendingFilmId) {
        return api.pendingFilms.getById.exec({ params: { id: +pendingFilmId } });
      }
      return null;
    },
    enabled: Boolean(pendingFilmId),
  });
};
