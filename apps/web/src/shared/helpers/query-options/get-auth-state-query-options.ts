import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getAuthStateQueryOptions = (staleTime?: number) => {
  return queryOptions({
    queryKey: [queryKey('auth.getState')],
    queryFn: api.auth.getState,
    staleTime,
  });
};
