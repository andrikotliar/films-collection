import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getFilmDraftsQueryOptions = (filmId: number) => {
  return queryOptions({
    queryKey: [api.films.getFilmDrafts.staticKey, filmId],
    queryFn: async () => {
      return api.films.getFilmDrafts.exec({ params: { id: filmId } });
    },
  });
};
