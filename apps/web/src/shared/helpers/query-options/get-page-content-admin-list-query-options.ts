import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getPageContentAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.pageContent.admin.list>,
) => {
  return queryOptions({
    queryKey: queryKeys.pageContent.admin.list({ queryParams }),
    queryFn: () => api.pageContent.admin.list({ queryParams }),
  });
};
