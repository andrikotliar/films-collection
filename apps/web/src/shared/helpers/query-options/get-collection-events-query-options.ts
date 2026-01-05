import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getCollectionEventsQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.collectionEvents.list(),
    queryFn: api.collectionEvents.list,
    retry: false,
  });
};
