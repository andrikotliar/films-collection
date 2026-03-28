import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getFilmsListQueryOptions = (
  queryParams: QueryParams<typeof api.films.getList.exec>,
) => {
  return queryOptions({
    queryKey: [api.films.getList.staticKey, queryParams],
    queryFn: () => api.films.getList.exec({ queryParams }),
  });
};
