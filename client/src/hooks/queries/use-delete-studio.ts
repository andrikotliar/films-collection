import { StudiosApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteStudio = () => {
  const invalidateQueries = useQueryInvalidation();
  return useMutation<unknown, HttpError, number>({
    mutationFn: StudiosApi.delete,
    onError: toaster.error,
    onSuccess: async () => {
      await invalidateQueries([queryKeys.studios.list, queryKeys.initialData.config]);
    },
  });
};
