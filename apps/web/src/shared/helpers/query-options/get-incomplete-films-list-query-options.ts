import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getIncompleteFilmsListQueryOptions = (
  queryParams: QueryParams<typeof api.films.getAdminIncompleteFilmsList.exec>,
) => {
  return queryOptions({
    queryKey: [api.films.getAdminIncompleteFilmsList.staticKey, queryParams],
    queryFn: async () => api.films.getAdminIncompleteFilmsList.exec({ queryParams }),
  });
};
