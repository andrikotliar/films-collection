import { StudiosApi } from '@/api';
import { queryKeys } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteStudio = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation({
    mutationFn: StudiosApi.delete,
    onError(error) {
      toaster.error(error.message);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.studios.list,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.initialData.config,
      });
    },
  });
};
