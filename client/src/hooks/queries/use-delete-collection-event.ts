import { CollectionEventsApi } from '@/api';
import { queryKeys } from '@/common';
import type { HttpError } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCollectionEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, HttpError, number, unknown>({
    mutationFn: CollectionEventsApi.deleteEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.collectionEvent.adminList,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.initialData.config,
      });
    },
  });
};
