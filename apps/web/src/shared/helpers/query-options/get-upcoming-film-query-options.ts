import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getUpcomingFilmQueryOptions = () => {
  return queryOptions({
    queryKey: [api.films.getUpcomingFilms.staticKey],
    queryFn: () => api.films.getUpcomingFilms.exec(),
    staleTime: 30 * 60 * 1000,
  });
};
