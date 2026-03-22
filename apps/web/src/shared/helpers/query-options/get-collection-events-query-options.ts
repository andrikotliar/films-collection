import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getCollectionEventsQueryOptions = () => {
  return queryOptions({
    queryKey: [api.collectionEvents.getAll.staticKey],
    queryFn: () => api.collectionEvents.getAll.exec(),
    retry: false,
  });
};
