import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getPageContentByKeyQueryOptions = (pageKey: string) => {
  return queryOptions({
    queryKey: queryKeys.pageContent.page.get({ params: { pageKey } }),
    queryFn: () => api.pageContent.page.get({ params: { pageKey } }),
  });
};

export const useSuspensePageContentByKey = (pageKey: string) => {
  return useSuspenseQuery(getPageContentByKeyQueryOptions(pageKey));
};
