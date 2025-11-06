import { PageContentApi } from '~/api';
import {
  mutateEntity,
  type FormValues,
  type HttpError,
  type OmitId,
  type PageContent,
} from '~/lib';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export type PageContentMutationPayload = FormValues<OmitId<PageContent>>;

export const useMutatePageContent = () => {
  const navigate = useNavigate();

  return useMutation<unknown, HttpError, PageContentMutationPayload>({
    mutationFn: (data) => {
      return mutateEntity(PageContentApi, data);
    },
    onSuccess: () => {
      navigate({
        to: '/console/page-content',
      });
    },
  });
};
