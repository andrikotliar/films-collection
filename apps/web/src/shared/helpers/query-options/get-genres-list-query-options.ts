import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getGenresListQueryOptions = (
  queryParams: QueryParams<typeof api.genres.getList.exec>,
) => {
  return queryOptions({
    queryKey: [api.genres.getList.staticKey, queryParams],
    queryFn: () => api.genres.getList.exec({ queryParams }),
  });
};
