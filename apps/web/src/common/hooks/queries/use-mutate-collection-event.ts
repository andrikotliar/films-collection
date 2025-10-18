import { CollectionEventsApi } from '~/api';
import {
  mutateEntity,
  queryKeys,
  type CollectionEvent,
  type FormValues,
  type HttpError,
  type OmitId,
} from '~/common';
import { useMutation } from '@tanstack/react-query';

export type CollectionEventMutationPayload = FormValues<
  OmitId<CollectionEvent> & {
    isOneDayEvent: boolean;
  }
>;

export const useMutateCollectionEvent = () => {
  return useMutation<unknown, HttpError, CollectionEventMutationPayload>({
    mutationFn: (payload) => {
      return mutateEntity(CollectionEventsApi, payload);
    },
    meta: {
      invalidateQueries: [queryKeys.collectionEvent.adminList, queryKeys.initialData.config],
    },
  });
};
