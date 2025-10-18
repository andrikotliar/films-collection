import { CountriesApi } from '~/api';
import { queryKeys } from '~/common';
import type { HttpError } from '~/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteCountry = () => {
  return useMutation<unknown, HttpError, number, unknown>({
    mutationFn: CountriesApi.delete,
    meta: {
      invalidateQueries: [queryKeys.countries.list, queryKeys.initialData.config],
    },
  });
};
