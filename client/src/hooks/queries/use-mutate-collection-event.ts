import { CollectionEventsApi } from '@/api';
import { isNewItem, queryKeys, type CollectionEvent, type FormValues } from '@/common';
import type { HttpError } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CollectionEventMutationPayload = FormValues<
  CollectionEvent,
  {
    isOneDayEvent: boolean;
  }
>;

export const useMutateCollectionEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, HttpError, CollectionEventMutationPayload>({
    mutationFn: async ({ id, isOneDayEvent, ...payload }) => {
      const body = {
        ...payload,
        endDate: isOneDayEvent ? payload.startDate : payload.endDate,
      };

      if (isNewItem(id)) {
        return CollectionEventsApi.createEvent(body);
      }

      return CollectionEventsApi.updateEvent(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.collectionEvent.adminList],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.initialData],
      });
    },
  });
};
