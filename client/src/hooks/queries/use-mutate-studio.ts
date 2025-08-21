import { StudiosApi } from '@/api';
import { mutateEntity, queryKeys, type Studio, type FormValues, type OmitId } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import type { HttpError } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type StudioMutationPayload = FormValues<OmitId<Studio>>;

export const useMutateStudio = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation<unknown, HttpError, StudioMutationPayload>({
    mutationFn: (data) => mutateEntity(StudiosApi, data),
    onError: (error) => toaster.error(error.message),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.studios.list,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.initialData.config,
      });
    },
  });
};
