import { CollectionEventsApi } from '@/api';
import { queryKeys } from '@/common';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteCollectionEvent = () => {
  return useMutation<unknown, HttpError, number, unknown>({
    mutationFn: CollectionEventsApi.deleteEvent,
    meta: {
      invalidateQueries: [queryKeys.collectionEvent.adminList, queryKeys.initialData.config],
    },
  });
};
