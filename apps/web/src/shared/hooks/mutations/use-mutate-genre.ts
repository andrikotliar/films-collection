import { mutateEntity, queryKeys, api } from '~/shared';
import { useMutation } from '@tanstack/react-query';

export const useMutateGenre = () => {
  return useMutation({
    mutationFn: mutateEntity(api.genres.create, api.genres.patch),
    meta: {
      invalidateQueries: [queryKeys.genres.list(), queryKeys.initialData.list()],
    },
  });
};
