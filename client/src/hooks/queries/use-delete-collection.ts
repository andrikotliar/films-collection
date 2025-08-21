import { CollectionsApi } from '@/api';
import { queryKeys } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation({
    mutationFn: CollectionsApi.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.collections.list,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.initialData.config,
      });
    },
    onError: (error) => toaster.error(error.message),
  });
};
