import { CountriesApi } from '~/api';
import { queryKeys, type HttpError } from '~/lib';
import { useMutation } from '@tanstack/react-query';

export const useDeleteCountry = () => {
  return useMutation<unknown, HttpError, number, unknown>({
    mutationFn: CountriesApi.delete,
    meta: {
      invalidateQueries: [queryKeys.countries.list, queryKeys.initialData.config],
    },
  });
};
