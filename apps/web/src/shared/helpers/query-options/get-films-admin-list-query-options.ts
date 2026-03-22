import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getFilmsAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.films.getAdminList.exec>,
) => {
  return queryOptions({
    queryKey: [api.films.getAdminList.staticKey],
    queryFn: () => api.films.getAdminList.exec({ queryParams }),
  });
};
