import { CountriesApi } from '~/api';
import {
  mutateEntity,
  queryKeys,
  type Country,
  type FormValues,
  type HttpError,
  type OmitId,
} from '~/shared';
import { useMutation } from '@tanstack/react-query';

export type CountryMutationPayload = FormValues<OmitId<Country>>;

export const useMutateCountry = () => {
  return useMutation<unknown, HttpError, CountryMutationPayload>({
    mutationFn: (data) => mutateEntity(CountriesApi, data),
    meta: {
      invalidateQueries: [queryKeys.countries.list, queryKeys.initialData.config],
    },
  });
};
