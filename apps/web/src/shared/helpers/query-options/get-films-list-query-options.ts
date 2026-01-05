import { queryOptions } from '@tanstack/react-query';
import { queryKeys, api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getFilmsListQueryOptions = (queryParams: QueryParams<typeof api.films.list>) => {
  return queryOptions({
    queryKey: queryKeys.films.list({ queryParams }),
    queryFn: () => api.films.list({ queryParams }),
  });
};
