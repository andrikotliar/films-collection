import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getStudiosListQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.studios.list(),
    queryFn: api.studios.list,
  });
};

export const useSuspenseStudiosList = () => {
  return useSuspenseQuery(getStudiosListQueryOptions());
};
