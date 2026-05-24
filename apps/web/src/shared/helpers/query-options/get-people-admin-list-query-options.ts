import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getPeopleAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.people.getList>,
) => {
  return queryOptions({
    queryKey: [queryKey('people.getList'), queryParams],
    queryFn: () => api.people.getList({ queryParams }),
  });
};
