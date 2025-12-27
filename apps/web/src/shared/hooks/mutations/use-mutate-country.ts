import { api, mutateEntity, queryKeys } from '~/shared';
import { useMutation } from '@tanstack/react-query';

export const useMutateCountry = () => {
  return useMutation({
    mutationFn: mutateEntity(api.countries.create, api.countries.patch),
    meta: {
      invalidateQueries: [queryKeys.countries.list(), queryKeys.initialData.list()],
    },
  });
};
