import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { AwardsApi } from '@/api';
import { BackLink, ConsoleContent, ConsoleTitle } from '@/components';
import { useToaster } from '@/hooks';
import { fetchAwardByIdQuery, NEW_ITEM_ID } from '@/common';
import { AwardForm } from './-components';
import { getFormDefaultValues } from './-helpers';
import { type AwardFormValues } from './-types';
import { getFormTitle } from '@/routes/console/-common/helpers';

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
    manageAward(values);
  };

  const pageTitle = getFormTitle(data);

  return (
    <ConsoleContent>
      <BackLink path="/console/general/awards">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <FormProvider {...form}>
        <AwardForm onSubmit={form.handleSubmit(handleSubmit)} isLoading={isPending} />
      </FormProvider>
    </ConsoleContent>
  );
}
