import { api, mutateEntity, queryKeys } from '~/shared';
import { useMutation } from '@tanstack/react-query';

export const useMutateCollectionEvent = () => {
  return useMutation({
    mutationFn: mutateEntity(api.collectionEvents.create, api.collectionEvents.patch),
    meta: {
      invalidateQueries: [queryKeys.collectionEvents.list(), queryKeys.initialData.list()],
    },
  });
};
