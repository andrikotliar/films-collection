import { PeopleApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const searchPersonQuery = (searchString: string | null) => {
  return queryOptions({
    queryKey: ['search-person', searchString],
    queryFn: ({ queryKey }) => PeopleApi.searchByName(queryKey[1]),
    retry: false,
    enabled: Boolean(searchString),
  });
};
