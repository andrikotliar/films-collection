import { useMutation } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const useDeleteCollection = () => {
  return useMutation({
    mutationFn: (id: number) => api.collections.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.collections.list()],
    },
  });
};
