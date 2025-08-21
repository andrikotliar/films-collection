import { CollectionEventsApi } from '@/api';
import { mutateEntity, queryKeys, type CollectionEvent, type FormValues } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import type { HttpError } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CollectionEventMutationPayload = FormValues<
  CollectionEvent & {
    isOneDayEvent: boolean;
  }
>;

export const useMutateCollectionEvent = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation<unknown, HttpError, CollectionEventMutationPayload>({
    mutationFn: (payload) => {
      return mutateEntity(CollectionEventsApi, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.collectionEvent.adminList,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.initialData.config,
      });
    },
    onError(error) {
      toaster.error(error.message);
    },
  });
};
