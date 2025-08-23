import { CountriesApi } from '@/api';
import {
  mutateEntity,
  queryKeys,
  toaster,
  type Country,
  type FormValues,
  type OmitId,
} from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export type CountryMutationPayload = FormValues<OmitId<Country>>;

export const useMutateCountry = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, CountryMutationPayload>({
    mutationFn: (data) => mutateEntity(CountriesApi, data),
    onError: toaster.error,
    onSuccess: async () => {
      await invalidateQueries([queryKeys.countries.list, queryKeys.initialData.config]);
    },
  });
};
