import { BackLink, Button, ConsoleContent, ConsoleTitle } from '@/components';
import { useDeleteCollection, type CollectionMutationPayload } from '@/hooks';
import { fetchCollectionsListQuery } from '@/common';
import { FormModal, List } from '@/routes/console/-common';
import { CollectionForm } from '@/routes/console/general_/collections/-components';
import { collectionFormDefaultValues } from '@/routes/console/general_/collections/-configs';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

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
      <Button
        icon={<PlusIcon />}
        variant="light"
        onClick={() => setCollection(collectionFormDefaultValues)}
      >
        Add collection
      </Button>
      <List
        items={data.list}
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
