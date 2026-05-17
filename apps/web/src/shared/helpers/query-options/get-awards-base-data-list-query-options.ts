import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getAwardsBaseDataListQueryOptions = (
  queryParams: QueryParams<typeof api.awards.getList.exec>,
) => {
  return queryOptions({
    queryKey: [api.awards.getList.staticKey, queryParams],
    queryFn: () => api.awards.getList.exec({ queryParams }),
  });
};
