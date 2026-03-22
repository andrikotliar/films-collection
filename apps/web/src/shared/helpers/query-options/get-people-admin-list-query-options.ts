import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getPeopleAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.people.getList.exec>,
) => {
  return queryOptions({
    queryKey: [api.people.getList.staticKey],
    queryFn: () => api.people.getList.exec({ queryParams }),
  });
};
