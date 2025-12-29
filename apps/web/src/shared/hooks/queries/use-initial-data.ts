import { api, queryKeys } from '~/shared/services';
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';

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

export const useInitialData = () => {
  return useQuery(getInitialDataQueryOptions());
};
