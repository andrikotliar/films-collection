import { GenresApi } from '@/api';
import {
  mutateEntity,
  queryKeys,
  type Genre,
  type FormValues,
  type OmitId,
  toaster,
} from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export type GenreMutationPayload = FormValues<OmitId<Genre>>;

export const useMutateGenre = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, GenreMutationPayload>({
    mutationFn: (data) => mutateEntity(GenresApi, data),
    onError: toaster.error,
    onSuccess: async () => {
      await invalidateQueries([queryKeys.genres.list, queryKeys.initialData.config]);
    },
  });
};
