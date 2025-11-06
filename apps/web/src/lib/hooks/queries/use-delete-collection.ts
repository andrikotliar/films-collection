import { CollectionsApi } from '~/api';
import { queryKeys, type HttpError } from '~/lib';
import { useMutation } from '@tanstack/react-query';

export const useDeleteCollection = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: CollectionsApi.delete,
    meta: {
      invalidateQueries: queryKeys.collections.list,
    },
  });
};
