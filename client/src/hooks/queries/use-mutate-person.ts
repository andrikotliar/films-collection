import { PeopleApi } from '@/api';
import { mutateEntity, queryKeys, toaster, type FormValues } from '@/common';
import { useQueryInvalidation } from '@/hooks/use-query-invalidation';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export type PersonMutationPayload = FormValues<{
  name: string;
}>;

export const useMutatePerson = () => {
  const invalidateQueries = useQueryInvalidation();

  return useMutation<unknown, HttpError, PersonMutationPayload>({
    mutationFn: (data) => mutateEntity(PeopleApi, data),
    onSuccess: async () => {
      await invalidateQueries(queryKeys.people.adminList);
    },
    onError: toaster.error,
  });
};
