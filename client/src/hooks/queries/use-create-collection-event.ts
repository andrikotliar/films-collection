import { CollectionEventsApi } from '@/api';
import { queryKeys, type CollectionEvent, type OmitId } from '@/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCollectionEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OmitId<CollectionEvent>) => {
      return CollectionEventsApi.createEvent(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.collectionEvent.adminList],
      });
    },
  });
};
