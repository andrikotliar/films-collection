import { useMutation } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const useDeletePendingFilm = () => {
  return useMutation({
    mutationFn: (id: number) => api.pendingFilms.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.pendingFilms.list()],
    },
  });
};
