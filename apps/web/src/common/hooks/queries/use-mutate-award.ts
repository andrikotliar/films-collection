import { AwardsApi } from '~/api';
import { mutateEntity, type FormValues, type HttpError } from '~/common';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export type NominationFormValue = {
  id: number;
  title: string;
  shouldIncludeActor: boolean;
};

export type AwardMutationPayload = FormValues<{
  title: string;
  description: string | null;
  nominations: NominationFormValue[];
}>;

export const useMutateAward = () => {
  const navigate = useNavigate();
  return useMutation<unknown, HttpError, AwardMutationPayload>({
    mutationFn: async (data) => mutateEntity(AwardsApi, data),
    onSuccess: () => {
      navigate({
        to: '/console/general/awards',
      });
    },
  });
};
