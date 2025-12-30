import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getPendingFilmQueryOptions = (pendingFilmId?: string) => {
  return queryOptions({
    queryKey: queryKeys.pendingFilms.get({ params: { id: pendingFilmId ? +pendingFilmId : 0 } }),
    queryFn: () => {
      if (pendingFilmId) {
        return api.pendingFilms.get({ params: { id: +pendingFilmId } });
      }
      return null;
    },
    enabled: Boolean(pendingFilmId),
  });
};

export const useSuspensePendingFilm = (id?: string) => {
  return useSuspenseQuery(getPendingFilmQueryOptions(id));
};
