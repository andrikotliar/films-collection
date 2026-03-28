import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getPageContentByKeyQueryOptions = (pageKey: string) => {
  return queryOptions({
    queryKey: [api.pageContent.getByPageKey.staticKey, pageKey],
    queryFn: () => api.pageContent.getByPageKey.exec({ params: { pageKey } }),
  });
};
