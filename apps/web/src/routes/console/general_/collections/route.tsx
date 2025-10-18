import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  fetchCollectionsListQuery,
  useDeleteCollection,
  type CollectionMutationPayload,
  BackLink,
  ConsoleContent,
  ConsoleTitle,
} from '~/common';
import { AddItemButton, FormModal, List } from '~/routes/console/-shared';
import { CollectionForm } from '~/routes/console/general_/collections/-components';
import { collectionFormDefaultValues } from '~/routes/console/general_/collections/-configs';

export const Route = createFileRoute('/console/general_/collections')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchCollectionsListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data } = useSuspenseQuery(fetchCollectionsListQuery());

  const [collection, setCollection] = useState<CollectionMutationPayload | null>(null);

  const { mutateAsync: deleteCollection, isPending: isDeleting } = useDeleteCollection();

  return (
    <ConsoleContent>
      <BackLink path="/console/general">Back to categories</BackLink>
      <ConsoleTitle>Collections</ConsoleTitle>
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
    </ConsoleContent>
  );
}
