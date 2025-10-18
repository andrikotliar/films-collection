import { PeopleApi } from '~/api';
import { mutateEntity, queryKeys, type FormValues } from '~/common';
import type { HttpError } from '~/services';
import { useMutation } from '@tanstack/react-query';

export type PersonMutationPayload = FormValues<{
  name: string;
}>;

export const useMutatePerson = () => {
  return useMutation<unknown, HttpError, PersonMutationPayload>({
    mutationFn: (data) => mutateEntity(PeopleApi, data),
    meta: {
      invalidateQueries: queryKeys.people.adminList,
    },
  });
};
