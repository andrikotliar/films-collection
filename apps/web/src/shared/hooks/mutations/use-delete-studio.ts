import { useMutation } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const useDeleteStudio = () => {
  return useMutation({
    mutationFn: (id: number) => api.studios.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.studios.list(), queryKeys.initialData.list()],
    },
  });
};
