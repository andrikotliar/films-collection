import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getArticlesAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.articles.getAdminList>,
) => {
  return queryOptions({
    queryKey: [queryKey('articles.getAdminList'), queryParams],
    queryFn: () => api.articles.getAdminList({ queryParams }),
  });
};
