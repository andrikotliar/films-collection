import { PendingFilmsApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeletePendingFilm = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, number>({
    mutationFn: PendingFilmsApi.delete,
    onSuccess: async () => {
      await invalidateQueries(queryKeys.pendingFilms.list);
    },
    onError: toaster.error,
  });
};
