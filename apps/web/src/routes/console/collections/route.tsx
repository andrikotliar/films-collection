import { createFileRoute } from '@tanstack/react-router';
import {
  getCollectionsListQueryOptions,
  getEmptyFormValues,
  api,
  type Input,
  queryKeys,
} from '~/shared';
import {
  AddItemButton,
  ConsoleContentLayout,
  List,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';
import { CollectionForm } from '~/routes/console/collections/-components';
import type z from 'zod';
import type { CollectionFormSchema } from '~/routes/console/collections/-schemas';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

const collectionFormDefaultValues = getEmptyFormValues<Input<typeof api.collections.create>>({
  title: '',
  category: 'GENERAL',
});

export const Route = createFileRoute('/console/collections')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getCollectionsListQueryOptions());
  },
  component: withFormModal(CollectionForm, PageContainer),
});

function PageContainer() {
  const { data } = useSuspenseQuery(getCollectionsListQueryOptions());
  const { onOpen } = useFormModal<z.infer<typeof CollectionFormSchema>>();

  const { mutateAsync: deleteCollection, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => api.collections.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.collections.list()],
    },
  });

  return (
    <ConsoleContentLayout title="Collections" backPath="/console">
      <AddItemButton onClick={() => onOpen(collectionFormDefaultValues)}>
        Add collection
      </AddItemButton>
      <List
        items={data}
        onDelete={deleteCollection}
        onEdit={onOpen}
        isDeletingInProgress={isDeleting}
      />
    </ConsoleContentLayout>
  );
}
