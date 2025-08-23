import { CountriesApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteCountry = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, number, unknown>({
    mutationFn: CountriesApi.delete,
    onSuccess: async () => {
      await invalidateQueries([queryKeys.countries.list, queryKeys.initialData.config]);
    },
    onError: toaster.error,
  });
};
