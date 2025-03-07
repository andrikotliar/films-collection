import { CollectionEventsApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchCollectionEventsQuery = () => {
  return queryOptions({
    queryKey: ['collection-events-admin-list'],
    queryFn: CollectionEventsApi.getAdminList,
    retry: false,
  });
};
