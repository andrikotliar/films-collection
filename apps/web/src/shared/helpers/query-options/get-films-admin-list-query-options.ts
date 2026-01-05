import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getFilmsAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.films.admin.list>,
) => {
  return queryOptions({
    queryKey: queryKeys.films.admin.list({ queryParams }),
    queryFn: () => api.films.admin.list({ queryParams }),
  });
};
