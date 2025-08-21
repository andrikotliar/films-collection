import { CountriesApi } from '@/api';
import { queryKeys } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import type { HttpError } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation<unknown, HttpError, number, unknown>({
    mutationFn: CountriesApi.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.countries.list,
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
