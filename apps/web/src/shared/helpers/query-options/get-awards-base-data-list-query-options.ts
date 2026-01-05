import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getAwardsBaseDataListQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.awards.list(),
    queryFn: api.awards.list,
  });
};
