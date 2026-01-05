import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getPeopleAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.people.list>,
) => {
  return queryOptions({
    queryKey: queryKeys.people.list({ queryParams }),
    queryFn: () => api.people.list({ queryParams }),
  });
};
