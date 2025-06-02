import { AwardsApi, FilesApi } from '@/api';
import { BackLink, ConsoleContent, ConsoleTitle } from '@/components';
import { NEW_ITEM_ID } from '@/constants';
import { getFileUploadFormData } from '@/helpers';
import { useToaster } from '@/hooks';
import { fetchAwardByIdQuery } from '@/queries';
import { AwardForm } from '@/routes/console/general_/awards_/-components';
import { awardDefaultFormValues } from '@/routes/console/general_/awards_/-configs';
import { AwardFormValues } from '@/routes/console/general_/awards_/-types';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';

export const Route = createFileRoute('/console/general_/awards_/$id')({
  loader: async ({ params, context: { queryClient } }) => {
    if (params.id !== NEW_ITEM_ID) {
      await queryClient.ensureQueryData(fetchAwardByIdQuery(params.id));
    }
  },
  component: PageContainer,
});

function PageContainer() {
  const navigate = Route.useNavigate();
  const { id } = Route.useParams();
  const toaster = useToaster();

  const isEdit = id !== NEW_ITEM_ID;

  const { data } = useSuspenseQuery(fetchAwardByIdQuery(id));

  const form = useForm({
    defaultValues: awardDefaultFormValues,
  });

  const { mutate: createAward, isPending: isCreating } = useMutation({
    mutationFn: AwardsApi.createAward,
    onSuccess: () => {
      navigate({
        to: '/console/general/awards',
      });
    },
    onError: (error) => {
      toaster.error(error.message);
    },
  });

  const handleSubmit = async (values: AwardFormValues) => {
    let image = values.image;

    try {
      if (image instanceof File) {
        const formData = getFileUploadFormData({
          title: values.title,
          destination: 'awards',
          file: image,
        });

        const response = await FilesApi.upload(formData);

        image = response.filePath;
      }
    } catch (error: any) {
      toaster.error(error.message);
      return;
    }

    createAward({
      ...values,
      image,
    });
  };

  const pageTitle = isEdit ? `Edit award: ${data.title}` : 'Create award';

  return (
    <ConsoleContent>
      <BackLink path="/console/general/awards">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <FormProvider {...form}>
        <AwardForm
          onSubmit={form.handleSubmit(handleSubmit)}
          isLoading={isCreating}
        />
      </FormProvider>
    </ConsoleContent>
  );
}
