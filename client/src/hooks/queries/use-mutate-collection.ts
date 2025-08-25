import { CollectionsApi } from '@/api';
import {
  mutateEntity,
  queryKeys,
  toaster,
  type Collection,
  type FormValues,
  type OmitId,
} from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export type CollectionMutationPayload = FormValues<OmitId<Collection>>;

export const useMutateCollection = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<Collection | unknown, HttpError, CollectionMutationPayload>({
    mutationFn: (data) => mutateEntity(CollectionsApi, data),
    onSuccess: async () => {
      await invalidateQueries([queryKeys.collections.list, queryKeys.initialData.config]);
    },
    onError: toaster.error,
  });
};
