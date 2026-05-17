import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getStudiosListQueryOptions = (
  queryParams: QueryParams<typeof api.studios.getList.exec>,
) => {
  return queryOptions({
    queryKey: [api.studios.getList.staticKey, queryParams],
    queryFn: () => api.studios.getList.exec({ queryParams }),
  });
};
