import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

type PendingFilmsListParams = Parameters<typeof api.pendingFilms.list>[0];

export const getPendingFilmsListQueryOptions = (
  queryParams: PendingFilmsListParams['queryParams'],
) => {
  return queryOptions({
    queryKey: queryKeys.pendingFilms.list({ queryParams }),
    queryFn: () => api.pendingFilms.list({ queryParams }),
  });
};
