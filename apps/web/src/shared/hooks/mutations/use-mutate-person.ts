import { useMutation } from '@tanstack/react-query';
import { mutateEntity } from '~/shared/helpers';
import { api, queryKeys } from '~/shared/services';

export const useMutatePerson = () => {
  return useMutation({
    mutationFn: mutateEntity(api.people.create, api.people.patch),
    meta: {
      invalidateQueries: [queryKeys.people.list()],
    },
  });
};
