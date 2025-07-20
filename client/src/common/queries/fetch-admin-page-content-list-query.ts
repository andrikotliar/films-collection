import { PageContentApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';
import { PAGE_CONTENT_ADMIN_PER_PAGE } from '../constants';

type QueryFilters = {
  pageIndex: number;
};

export const fetchAdminPageContentListQuery = (
  filters: Partial<QueryFilters>,
) => {
  return queryOptions({
    queryKey: ['page-content', filters] as const,
    queryFn: ({ queryKey }) => {
      const { pageIndex = 0 } = queryKey[1];

      return PageContentApi.getList({
        skip: pageIndex * PAGE_CONTENT_ADMIN_PER_PAGE,
      });
    },
  });
};
