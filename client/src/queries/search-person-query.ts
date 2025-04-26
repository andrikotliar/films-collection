import { PeopleApi, SearchByNamePayload } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const searchPersonQuery = (payload: SearchByNamePayload) => {
  return queryOptions({
    queryKey: ['search-person', payload],
    queryFn: ({ queryKey }) =>
      PeopleApi.searchByName(queryKey[1] as SearchByNamePayload),
    retry: false,
    enabled: Boolean(payload.query),
  });
};
