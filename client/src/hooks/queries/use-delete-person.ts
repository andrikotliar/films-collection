import { PeopleApi } from '@/api';
import { queryKeys, toaster } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeletePerson = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, number>({
    mutationFn: PeopleApi.delete,
    onError: toaster.error,
    onSuccess: async () => {
      await invalidateQueries(queryKeys.people.adminList);
    },
  });
};
