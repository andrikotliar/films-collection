import { CountriesApi } from '@/api';
import { mutateEntity, queryKeys, type Country, type FormValues, type OmitId } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import type { HttpError } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CountryMutationPayload = FormValues<OmitId<Country>>;

export const useMutateCountry = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation<unknown, HttpError, CountryMutationPayload>({
    mutationFn: (data) => mutateEntity(CountriesApi, data),
    onError: (error) => toaster.error(error.message),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.countries.list,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.initialData.config,
      });
    },
  });
};
