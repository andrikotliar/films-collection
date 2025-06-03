import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { AwardsApi, FilesApi } from '@/api';
import { BackLink, ConsoleContent, ConsoleTitle } from '@/components';
import { NEW_ITEM_ID } from '@/constants';
import { getFileUploadFormData } from '@/helpers';
import { useToaster } from '@/hooks';
import { fetchAwardByIdQuery } from '@/queries';
import { AwardForm } from './-components';
import { getFormDefaultValues } from './-helpers';
import { AwardFormValues } from './-types';

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

  const { data } = useSuspenseQuery(fetchAwardByIdQuery(id));

  const form = useForm<AwardFormValues>({
    defaultValues: getFormDefaultValues(data),
  });

  const { mutate: manageAward, isPending } = useMutation({
    mutationFn: (data: AwardFormValues) => {
      if (id !== NEW_ITEM_ID) {
        return AwardsApi.updateAward(+id, data);
      }

      return AwardsApi.createAward(data);
    },
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

    manageAward({
      ...values,
      image,
    });
  };

  const pageTitle = data ? `Edit award: ${data.title}` : 'Create award';

  return (
    <ConsoleContent>
      <BackLink path="/console/general/awards">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <FormProvider {...form}>
        <AwardForm
          onSubmit={form.handleSubmit(handleSubmit)}
          isLoading={isPending}
        />
      </FormProvider>
    </ConsoleContent>
  );
}
