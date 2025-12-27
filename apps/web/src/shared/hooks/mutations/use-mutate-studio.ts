import { useMutation } from '@tanstack/react-query';
import { mutateEntity } from '~/shared/helpers';
import { api, queryKeys } from '~/shared/services';

export const useMutateStudio = () => {
  return useMutation({
    mutationFn: mutateEntity(api.studios.create, api.studios.patch),
    meta: {
      invalidateQueries: [queryKeys.studios.list(), queryKeys.initialData.list()],
    },
  });
};
