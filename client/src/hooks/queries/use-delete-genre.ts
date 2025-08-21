import { GenresApi } from '@/api';
import { queryKeys } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import type { HttpError } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteGenre = () => {
  const toaster = useToaster();
  const queryClient = useQueryClient();

  return useMutation<unknown, HttpError, number>({
    mutationFn: GenresApi.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.collections.list,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.initialData.config,
      });
    },
    onError: (error) => {
      toaster.error(error.message);
    },
  });
};
