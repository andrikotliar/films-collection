import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getAuthStateQueryOptions = () => {
  return queryOptions({
    queryKey: [queryKeys.auth.state.list],
    queryFn: api.auth.state.list,
  });
};
