import { api, queryKeys } from '~/shared';
import { useMutation } from '@tanstack/react-query';

export const useDeleteCollectionEvent = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return api.collectionEvents.remove({ params: { id } });
    },
    meta: {
      invalidateQueries: [queryKeys.collectionEvents.list(), queryKeys.initialData.list()],
    },
  });
};
