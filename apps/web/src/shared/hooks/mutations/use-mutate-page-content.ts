import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { mutateEntity } from '~/shared/helpers';
import { api } from '~/shared/services';

export const useMutatePageContent = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: mutateEntity(api.pageContent.create, api.pageContent.patch),
    onSuccess: () => {
      navigate({
        to: '/console/page-content',
      });
    },
  });
};
