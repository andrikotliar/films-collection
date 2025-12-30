import { api, queryKeys } from '~/shared/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteAward = () => {
  return useMutation({
    mutationFn: (id: number) => api.awards.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.awards.list()],
    },
  });
};
