import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getFilmQueryOptions = (filmId: number) => {
  return queryOptions({
    queryKey: [api.films.getById, filmId],
    queryFn: () => api.films.getById.exec({ params: { id: filmId } }),
  });
};
