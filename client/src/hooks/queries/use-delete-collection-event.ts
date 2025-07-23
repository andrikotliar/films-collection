import { CollectionEventsApi } from '@/api';
import { queryKeys } from '@/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCollectionEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CollectionEventsApi.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.collectionEvent.adminList],
      });
    },
  });
};
