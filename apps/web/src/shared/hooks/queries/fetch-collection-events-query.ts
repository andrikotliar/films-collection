import { CollectionEventsApi } from '~/api';
import { queryKeys } from '~/shared';
import { queryOptions } from '@tanstack/react-query';

export const fetchCollectionEventsQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.collectionEvent.adminList],
    queryFn: CollectionEventsApi.getAdminList,
    retry: false,
  });
};
