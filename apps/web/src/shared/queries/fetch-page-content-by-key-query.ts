import { PageContentApi } from '~/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchPageContentByKeyQuery = (key: string) => {
  return queryOptions({
    queryKey: ['page-content', 'pageKey', key] as const,
    queryFn: ({ queryKey }) => PageContentApi.getPageContentByKey(queryKey[2]),
  });
};
