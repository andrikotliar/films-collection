import { mutationOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api, getEmptyFormValues, getStudiosListQueryOptions, type Input } from '~/shared';
import { List, useFormModal, withFormModal } from '~/routes/console/-shared';
import { StudioForm } from '~/routes/console/studios/-components';

const studioInitialValues = getEmptyFormValues<Input<typeof api.studios.create.exec>>({
  title: '',
});

export const Route = createFileRoute('/console/studios')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getStudiosListQueryOptions());
  },
  component: withFormModal(StudioForm, PageContainer),
  staticData: {
    title: 'Studios',
    backPath: '/console',
  },
});

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.studios.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: { queryKey: api.studios.getList.staticKey },
    },
  });
};

function PageContainer() {
  const { data, isFetching } = useSuspenseQuery(getStudiosListQueryOptions());
  const { onOpen } = useFormModal();

  return (
    <List
      data={data}
      getDeleteMutationOptions={getDeleteMutationOptions}
      onEdit={onOpen}
      isFetching={isFetching}
      onCreate={() => onOpen(studioInitialValues)}
      createItemTitle="New studio"
    />
  );
}
