import { StudiosApi } from '~/api';
import { queryKeys, type HttpError } from '~/shared';
import { useMutation } from '@tanstack/react-query';

export const useDeleteStudio = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: StudiosApi.delete,
    meta: {
      invalidateQueries: [queryKeys.studios.list, queryKeys.initialData.config],
    },
  });
};
