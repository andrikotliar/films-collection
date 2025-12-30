import { useMutation } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const useDeletePerson = () => {
  return useMutation({
    mutationFn: (id: number) => api.people.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.people.list()],
    },
  });
};
