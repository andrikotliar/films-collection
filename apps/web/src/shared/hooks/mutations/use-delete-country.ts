import { useMutation } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const useDeleteCountry = () => {
  return useMutation({
    mutationFn: (id: number) => api.countries.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.countries.list(), queryKeys.initialData.list()],
    },
  });
};
