import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  api,
  getEmptyFormValues,
  getStudiosListQueryOptions,
  queryKeys,
  type Input,
} from '~/shared';
import {
  AddItemButton,
  ConsoleContentLayout,
  List,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';
import { StudioForm } from '~/routes/console/studios/-components';

const studioInitialValues = getEmptyFormValues<Input<typeof api.studios.create>>({ title: '' });

export const Route = createFileRoute('/console/studios')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getStudiosListQueryOptions());
  },
  component: withFormModal(StudioForm, PageContainer),
});

function PageContainer() {
  const { data } = useSuspenseQuery(getStudiosListQueryOptions());
  const { onOpen } = useFormModal();

  const { mutateAsync: deleteStudio, isPending: isDeletePending } = useMutation({
    mutationFn: (id: number) => api.studios.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.studios.list()],
    },
  });

  return (
    <ConsoleContentLayout title="Studios" backPath="/console">
      <AddItemButton onClick={() => onOpen(studioInitialValues)}>Create studio</AddItemButton>
      <List
        items={data}
        onDelete={deleteStudio}
        onEdit={onOpen}
        isDeletingInProgress={isDeletePending}
      />
    </ConsoleContentLayout>
  );
}
