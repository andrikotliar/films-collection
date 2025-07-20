import { PostsApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';
import { POSTS_ADMIN_PER_PAGE } from '../constants';

type QueryFilters = {
  pageIndex: number;
};

export const fetchAdminPostsListQuery = (filters: Partial<QueryFilters>) => {
  return queryOptions({
    queryKey: ['posts', filters] as const,
    queryFn: ({ queryKey }) => {
      const { pageIndex = 0 } = queryKey[1];

      return PostsApi.getList({
        skip: pageIndex * POSTS_ADMIN_PER_PAGE,
      });
    },
  });
};
