import { CollectionsApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteCollection = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, number>({
    mutationFn: CollectionsApi.delete,
    onSuccess: async () => {
      await invalidateQueries([queryKeys.collections.list]);
    },
    onError: toaster.error,
  });
};
