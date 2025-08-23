import { StudiosApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import { useMutation } from '@tanstack/react-query';

export const useDeleteStudio = () => {
  const invalidateQueries = useQueryInvalidation();
  return useMutation({
    mutationFn: StudiosApi.delete,
    onError: toaster.error,
    onSuccess: async () => {
      await invalidateQueries([queryKeys.studios.list, queryKeys.initialData.config]);
    },
  });
};
