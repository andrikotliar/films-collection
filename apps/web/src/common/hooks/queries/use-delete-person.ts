import { PeopleApi } from '~/api';
import { queryKeys } from '~/common';
import type { HttpError } from '~/services';
import { useMutation } from '@tanstack/react-query';

export const useDeletePerson = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: PeopleApi.delete,
    meta: {
      invalidateQueries: queryKeys.people.adminList,
    },
  });
};
