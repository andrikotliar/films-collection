import { PostsApi, PostsListFilters } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchAdminPostsListQuery = (
  filters: Partial<PostsListFilters>,
) => {
  return queryOptions({
    queryKey: ['posts', filters] as const,
    queryFn: ({ queryKey }) => {
      const { skip } = queryKey[1];

      return PostsApi.getList({
        skip: skip ?? 0,
      });
    },
  });
};
