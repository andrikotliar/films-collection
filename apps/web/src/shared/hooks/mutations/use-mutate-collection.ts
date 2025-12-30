import { api, mutateEntity, queryKeys } from '~/shared';
import { useMutation } from '@tanstack/react-query';

export const useMutateCollection = () => {
  return useMutation({
    mutationFn: mutateEntity(api.collections.create, api.collections.patch),
    meta: {
      invalidateQueries: [queryKeys.collections.list(), queryKeys.initialData.list()],
    },
  });
};
