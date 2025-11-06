import { PeopleApi } from '~/api';
import { queryKeys, type HttpError } from '~/lib';
import { useMutation } from '@tanstack/react-query';

export const useDeletePerson = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: PeopleApi.delete,
    meta: {
      invalidateQueries: queryKeys.people.adminList,
    },
  });
};
