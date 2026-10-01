import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const buildGetCollectionEventsQueryOptions = (
  queryParams: QueryParams<typeof api.collectionEvents.getList>,
) => {
  return queryOptions({
    queryKey: queryKey('collectionEvents.getList', queryParams),
    queryFn: () => api.collectionEvents.getList({ queryParams }),
    retry: false,
  });
};
