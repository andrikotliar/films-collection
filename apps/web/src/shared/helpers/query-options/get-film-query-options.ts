import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getFilmQueryOptions = (filmId: number) => {
  return queryOptions({
    queryKey: [queryKey('films.getById'), filmId],
    queryFn: () => api.films.getById({ params: { id: filmId } }),
    staleTime: Infinity,
  });
};
