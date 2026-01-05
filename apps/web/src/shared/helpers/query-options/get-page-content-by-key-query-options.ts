import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getPageContentByKeyQueryOptions = (pageKey: string) => {
  return queryOptions({
    queryKey: queryKeys.pageContent.page.get({ params: { pageKey } }),
    queryFn: () => api.pageContent.page.get({ params: { pageKey } }),
  });
};
