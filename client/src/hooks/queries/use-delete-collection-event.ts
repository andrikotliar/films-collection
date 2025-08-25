import { CollectionEventsApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteCollectionEvent = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, number, unknown>({
    mutationFn: CollectionEventsApi.deleteEvent,
    onError: toaster.error,
    onSuccess: async () => {
      await invalidateQueries([queryKeys.collectionEvent.adminList, queryKeys.initialData.config]);
    },
  });
};
