import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

type PendingFilmsListParams = Parameters<typeof api.pendingFilms.getList.exec>[0];

export const getPendingFilmsListQueryOptions = (
  queryParams: PendingFilmsListParams['queryParams'],
) => {
  return queryOptions({
    queryKey: [api.pendingFilms.getList],
    queryFn: () => api.pendingFilms.getList.exec({ queryParams }),
  });
};
