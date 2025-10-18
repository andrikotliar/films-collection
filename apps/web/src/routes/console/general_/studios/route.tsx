import { BackLink, ConsoleContent, ConsoleTitle } from '~/components';
import { fetchStudiosListQuery } from '~/common';
import { AddItemButton, FormModal, List } from '~/routes/console/-common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useDeleteStudio } from '~/hooks';
import { StudioForm } from '~/routes/console/general_/studios/-components';
import type { StudioMutationPayload } from '~/hooks/queries/use-mutate-studio';
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
    <ConsoleContent>
      <BackLink path="/console/general">Back to categories</BackLink>
      <ConsoleTitle>Studios</ConsoleTitle>
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
    </ConsoleContent>
  );
}
