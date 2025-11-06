import { CollectionEventsApi } from '~/api';
import { queryKeys } from '~/lib';
import { queryOptions } from '@tanstack/react-query';

export const fetchCollectionEventsQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.collectionEvent.adminList],
    queryFn: CollectionEventsApi.getAdminList,
    retry: false,
  });
};
