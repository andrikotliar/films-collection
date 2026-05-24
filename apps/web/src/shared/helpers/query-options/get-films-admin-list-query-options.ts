import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getFilmsAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.films.getAdminList>,
) => {
  return queryOptions({
    queryKey: [queryKey('films.getAdminList'), queryParams],
    queryFn: () => api.films.getAdminList({ queryParams }),
  });
};
