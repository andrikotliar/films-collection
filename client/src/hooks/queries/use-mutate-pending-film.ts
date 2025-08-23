import { PendingFilmsApi } from '@/api';
import { mutateEntity, queryKeys, toaster, type FormValues, type PendingFilm } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export type PendingFilmMutationPayload = FormValues<Omit<PendingFilm, 'id' | 'createdAt'>>;

export const useMutatePendingFilm = () => {
  const invalidateQueries = useQueryInvalidation();
  return useMutation<unknown, HttpError, PendingFilmMutationPayload>({
    mutationFn: async (data) => mutateEntity(PendingFilmsApi, data),
    onSuccess: async () => {
      await invalidateQueries(queryKeys.pendingFilms.list);
    },
    onError: toaster.error,
  });
};
