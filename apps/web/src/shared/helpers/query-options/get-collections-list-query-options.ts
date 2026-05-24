import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getCollectionsListQueryOptions = (
  queryParams: QueryParams<typeof api.collections.getList>,
) => {
  return queryOptions({
    queryKey: [queryKey('collections.getList'), queryParams],
    queryFn: () => api.collections.getList({ queryParams }),
  });
};
