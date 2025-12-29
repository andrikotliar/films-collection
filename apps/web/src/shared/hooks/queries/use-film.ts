import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getFilmQueryOptions = (filmId: number) => {
  return queryOptions({
    queryKey: queryKeys.films.get({ params: { id: filmId } }),
    queryFn: () => api.films.get({ params: { id: filmId } }),
  });
};

export const useSuspenseFilm = (filmId: number) => {
  return useSuspenseQuery(getFilmQueryOptions(filmId));
};
