import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  getCollectionsListQueryOptions,
  useDeleteCollection,
  useSuspenseCollectionsList,
} from '~/shared';
import { AddItemButton, ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import {
  CollectionForm,
  type CollectionFormSchema,
} from '~/routes/console/general_/collections/-components';
import { collectionFormDefaultValues } from '~/routes/console/general_/collections/-configs';
import type z from 'zod';

export const Route = createFileRoute('/console/general_/collections')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getCollectionsListQueryOptions());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data } = useSuspenseCollectionsList();

  const [collection, setCollection] = useState<z.infer<typeof CollectionFormSchema> | null>(null);

  const { mutateAsync: deleteCollection, isPending: isDeleting } = useDeleteCollection();

  return (
    <ConsoleContentLayout
      title="Collections"
      backPath="/console/general"
      backPathTitle="Back to categories"
    >
      <AddItemButton onClick={() => setCollection(collectionFormDefaultValues)}>
        Add collection
      </AddItemButton>
      <List
        items={data}
        onDelete={deleteCollection}
        onEdit={setCollection}
        isDeletingInProgress={isDeleting}
      />
      <FormModal
        values={collection}
        onClose={() => setCollection(null)}
        form={CollectionForm}
        afterSubmitEffect={() => setCollection(null)}
      />
    </ConsoleContentLayout>
  );
}
