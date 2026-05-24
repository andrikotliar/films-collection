import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getFilmsListQueryOptions = (queryParams: QueryParams<typeof api.films.getList>) => {
  return queryOptions({
    queryKey: [queryKey('films.getList'), queryParams],
    queryFn: () => api.films.getList({ queryParams }),
  });
};
