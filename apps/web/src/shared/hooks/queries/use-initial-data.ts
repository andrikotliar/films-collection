import { api, queryKeys } from '~/shared/services';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getInitialDataQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.initialData.list(),
    queryFn: api.initialData.list,
    staleTime: Infinity,
  });
};

export const useSuspenseInitialData = () => {
  return useSuspenseQuery(getInitialDataQueryOptions());
};
