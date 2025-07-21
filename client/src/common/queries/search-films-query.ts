import { FilmsApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const searchFilmsQuery = (searchString: string | null) => {
  return queryOptions({
    queryKey: ['films-search', searchString],
    queryFn: ({ queryKey }) => FilmsApi.search(queryKey[1]),
    enabled: Boolean(searchString),
    retry: false,
  });
};
