import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

type AdminListParams = Parameters<typeof api.films.admin.list>[0];

export const getFilmsAdminListQueryOptions = (queryParams: AdminListParams['queryParams']) => {
  return queryOptions({
    queryKey: queryKeys.films.admin.list({ queryParams }),
    queryFn: () => api.films.admin.list({ queryParams }),
  });
};

export const useSuspenseFilmsAdminList = (queryParams: AdminListParams['queryParams']) => {
  return useSuspenseQuery(getFilmsAdminListQueryOptions(queryParams));
};
