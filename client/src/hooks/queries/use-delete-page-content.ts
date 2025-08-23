import { PageContentApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import { useMutation } from '@tanstack/react-query';

export const useDeletePageContent = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation({
    mutationFn: PageContentApi.delete,
    onError: toaster.error,
    onSuccess: async () => {
      await invalidateQueries(queryKeys.pageContent.list);
    },
  });
};
