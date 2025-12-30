import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

type PendingFilmsListParams = Parameters<typeof api.pendingFilms.list>[0];

export const getPendingFilmsListQuery = (queryParams: PendingFilmsListParams['queryParams']) => {
  return queryOptions({
    queryKey: queryKeys.pendingFilms.list({ queryParams }),
    queryFn: () => api.pendingFilms.list({ queryParams }),
  });
};

export const useSuspensePendingFilmsList = (queryParams: PendingFilmsListParams['queryParams']) => {
  return useSuspenseQuery(getPendingFilmsListQuery(queryParams));
};
