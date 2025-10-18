import { CollectionsApi } from '~/api';
import { queryKeys } from '~/common';
import type { HttpError } from '~/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteCollection = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: CollectionsApi.delete,
    meta: {
      invalidateQueries: queryKeys.collections.list,
    },
  });
};
