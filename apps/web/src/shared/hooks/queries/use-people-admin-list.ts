import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export type AdminPeopleListParams = Parameters<typeof api.people.list>[0];

export const getPeopleAdminListQueryOptions = (
  queryParams: AdminPeopleListParams['queryParams'],
) => {
  return queryOptions({
    queryKey: queryKeys.people.list({ queryParams }),
    queryFn: () => api.people.list({ queryParams }),
  });
};

export const useSuspensePeopleAdminList = (queryParams: AdminPeopleListParams['queryParams']) => {
  return useSuspenseQuery(getPeopleAdminListQueryOptions(queryParams));
};
