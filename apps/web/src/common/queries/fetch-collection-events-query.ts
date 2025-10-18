import { CollectionEventsApi } from '~/api';
import { queryKeys } from '~/common';
import { queryOptions } from '@tanstack/react-query';

export const fetchCollectionEventsQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.collectionEvent.adminList],
    queryFn: CollectionEventsApi.getAdminList,
    retry: false,
  });
};
