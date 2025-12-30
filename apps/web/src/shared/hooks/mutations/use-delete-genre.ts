import { useMutation } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const useDeleteGenre = () => {
  return useMutation({
    mutationFn: (id: number) => api.genres.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.genres.list(), queryKeys.initialData.list()],
    },
  });
};
