import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getPageContentAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.pageContent.getAdminList.exec>,
) => {
  return queryOptions({
    queryKey: [api.pageContent.getAdminList.staticKey, queryParams],
    queryFn: () => api.pageContent.getAdminList.exec({ queryParams }),
  });
};
