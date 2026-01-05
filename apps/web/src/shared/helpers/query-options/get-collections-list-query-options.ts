import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getCollectionsListQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.collections.list(),
    queryFn: api.collections.list,
  });
};
