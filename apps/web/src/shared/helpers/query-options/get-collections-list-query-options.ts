import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getCollectionsListQueryOptions = (
  queryParams: QueryParams<typeof api.collections.getList.exec>,
) => {
  return queryOptions({
    queryKey: [api.collections.getList.staticKey, queryParams],
    queryFn: () => api.collections.getList.exec({ queryParams }),
  });
};
