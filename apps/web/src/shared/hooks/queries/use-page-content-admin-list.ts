import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

type AdminPageContentListParams = Parameters<typeof api.pageContent.admin.list>[0];

export const getPageContentAdminListQueryOptions = (
  queryParams: AdminPageContentListParams['queryParams'],
) => {
  return queryOptions({
    queryKey: queryKeys.pageContent.admin.list({ queryParams }),
    queryFn: () => api.pageContent.admin.list({ queryParams }),
  });
};

export const useSuspensePageContentAdminList = (
  queryParams: AdminPageContentListParams['queryParams'],
) => {
  return useSuspenseQuery(getPageContentAdminListQueryOptions(queryParams));
};
