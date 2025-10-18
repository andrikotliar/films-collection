import { StudiosApi } from '~/api';
import {
  mutateEntity,
  queryKeys,
  type Studio,
  type FormValues,
  type OmitId,
  type HttpError,
} from '~/common';
import { useMutation } from '@tanstack/react-query';

export type StudioMutationPayload = FormValues<OmitId<Studio>>;

export const useMutateStudio = () => {
  return useMutation<unknown, HttpError, StudioMutationPayload>({
    mutationFn: (data) => mutateEntity(StudiosApi, data),
    meta: {
      invalidateQueries: [queryKeys.studios.list, queryKeys.initialData.config],
    },
  });
};
