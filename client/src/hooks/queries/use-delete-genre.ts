import { GenresApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteGenre = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, number>({
    mutationFn: GenresApi.delete,
    onSuccess: async () => {
      await invalidateQueries([queryKeys.collections.list, queryKeys.initialData.config]);
    },
    onError: toaster.error,
  });
};
