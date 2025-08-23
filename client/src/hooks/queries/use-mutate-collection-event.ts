import { CollectionEventsApi } from '@/api';
import {
  mutateEntity,
  queryKeys,
  toaster,
  type CollectionEvent,
  type FormValues,
  type OmitId,
} from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export type CollectionEventMutationPayload = FormValues<
  OmitId<CollectionEvent> & {
    isOneDayEvent: boolean;
  }
>;

export const useMutateCollectionEvent = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, CollectionEventMutationPayload>({
    mutationFn: (payload) => {
      return mutateEntity(CollectionEventsApi, payload);
    },
    onSuccess: async () => {
      await invalidateQueries([queryKeys.collectionEvent.adminList, queryKeys.initialData.config]);
    },
    onError: toaster.error,
  });
};
