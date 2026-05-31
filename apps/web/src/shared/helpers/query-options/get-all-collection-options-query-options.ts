import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getAllCollectionOptionsQueryOptions = () => {
  return queryOptions({
    queryKey: [queryKey('collections.getAll')],
    queryFn: api.collections.getAll,
    staleTime: Infinity,
  });
};
