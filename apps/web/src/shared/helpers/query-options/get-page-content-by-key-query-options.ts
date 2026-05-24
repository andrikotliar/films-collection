import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getPageContentByKeyQueryOptions = (pageKey: string) => {
  return queryOptions({
    queryKey: [queryKey('pageContent.getByPageKey'), pageKey],
    queryFn: () => api.pageContent.getByPageKey({ params: { pageKey } }),
  });
};
