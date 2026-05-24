import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getPageContentAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.pageContent.getAdminList>,
) => {
  return queryOptions({
    queryKey: [queryKey('pageContent.getAdminList'), queryParams],
    queryFn: () => api.pageContent.getAdminList({ queryParams }),
  });
};
