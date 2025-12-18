import { CollectionsApi } from '~/api';
import {
  mutateEntity,
  queryKeys,
  type Collection,
  type FormValues,
  type HttpError,
  type OmitId,
} from '~/shared';

import { useMutation } from '@tanstack/react-query';

export type CollectionMutationPayload = FormValues<OmitId<Collection>>;

export const useMutateCollection = () => {
  return useMutation<Collection | unknown, HttpError, CollectionMutationPayload>({
    mutationFn: (data) => mutateEntity(CollectionsApi, data),
    meta: {
      invalidateQueries: [queryKeys.collections.list, queryKeys.initialData.config],
    },
  });
};
