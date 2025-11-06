import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fetchStudiosListQuery, useDeleteStudio, type StudioMutationPayload } from '~/lib';
import { AddItemButton, ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { StudioForm } from '~/routes/console/general_/studios/-components';
import { studioInitialValues } from '~/routes/console/general_/studios/-configs';

export const Route = createFileRoute('/console/general_/studios')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchStudiosListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data } = useSuspenseQuery(fetchStudiosListQuery());

  const [studio, setStudio] = useState<StudioMutationPayload | null>(null);

  const { mutateAsync: deleteStudio, isPending: isDeletePending } = useDeleteStudio();

  return (
    <ConsoleContentLayout
      title="Studios"
      backPath="/console/general"
      backPathTitle="Back to categories"
    >
      <AddItemButton onClick={() => setStudio(studioInitialValues)}>Create studio</AddItemButton>
      <List
        items={data}
        onDelete={deleteStudio}
        onEdit={setStudio}
        isDeletingInProgress={isDeletePending}
      />
      <FormModal
        values={studio}
        onClose={() => setStudio(null)}
        afterSubmitEffect={() => setStudio(null)}
        form={StudioForm}
      />
    </ConsoleContentLayout>
  );
}
