import { createFileRoute } from '@tanstack/react-router';
import { getCollectionsListQueryOptions, getEmptyFormValues, api, type Input } from '~/shared';
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

const collectionFormDefaultValues = getEmptyFormValues<Input<typeof api.collections.create.exec>>({
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
  const { data, isFetching } = useSuspenseQuery(getCollectionsListQueryOptions());
  const { onOpen } = useFormModal<z.infer<typeof CollectionFormSchema>>();

  const { mutateAsync: deleteCollection, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => api.collections.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: [
        {
          queryKey: api.collections.getList.staticKey,
        },
        {
          queryKey: api.films.getDashboard.staticKey,
        },
      ],
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
        isFetching={isFetching}
      />
    </ConsoleContentLayout>
  );
}
