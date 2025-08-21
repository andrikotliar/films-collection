import { CollectionsApi } from '@/api';
import { mutateEntity, queryKeys, type Collection, type FormValues } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import type { HttpError } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CollectionMutationPayload = FormValues<Collection>;

export const useMutateCollection = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation<Collection | unknown, HttpError, CollectionMutationPayload>({
    mutationFn: (data) => mutateEntity(CollectionsApi, data),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.collections.list,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.initialData.config,
      });
    },
    onError(error) {
      toaster.error(error?.message);
    },
  });
};
