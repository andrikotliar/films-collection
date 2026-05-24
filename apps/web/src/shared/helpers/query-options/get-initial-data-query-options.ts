import { api, queryKey } from '~/shared/services';
import { queryOptions } from '@tanstack/react-query';

export const getInitialDataQueryOptions = () => {
  return queryOptions({
    queryKey: [queryKey('initialData.get')],
    queryFn: api.initialData.get,
    staleTime: Infinity,
  });
};
