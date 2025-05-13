import { PostsApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchPostByKeyQuery = (key: string) => {
  return queryOptions({
    queryKey: ['post', 'key', key] as const,
    queryFn: ({ queryKey }) => PostsApi.getPostByKey(queryKey[2]),
  });
};
