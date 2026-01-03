import { mutateEntity, api } from '~/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useMutateAward = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: mutateEntity(api.awards.create, api.awards.patch),
    onSuccess: () => {
      navigate({
        to: '/console/awards',
      });
    },
  });
};
