import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';
import type { QueryParams } from '~/shared/types';

export const getCollectionEventsQueryOptions = (
  queryParams: QueryParams<typeof api.collectionEvents.getList.exec>,
) => {
  return queryOptions({
    queryKey: [api.collectionEvents.getList.staticKey, queryParams],
    queryFn: () => api.collectionEvents.getList.exec({ queryParams }),
    retry: false,
  });
};
