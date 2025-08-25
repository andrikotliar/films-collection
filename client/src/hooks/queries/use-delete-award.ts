import { AwardsApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteAward = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, number>({
    mutationFn: AwardsApi.delete,
    onError: toaster.error,
    onSuccess: async () => {
      await invalidateQueries(queryKeys.awards.list);
    },
  });
};
