import { StudiosApi } from '@/api';
import {
  mutateEntity,
  queryKeys,
  type Studio,
  type FormValues,
  type OmitId,
  toaster,
} from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export type StudioMutationPayload = FormValues<OmitId<Studio>>;

export const useMutateStudio = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, StudioMutationPayload>({
    mutationFn: (data) => mutateEntity(StudiosApi, data),
    onError: toaster.error,
    onSuccess: async () => {
      await invalidateQueries([queryKeys.studios.list, queryKeys.initialData.config]);
    },
  });
};
