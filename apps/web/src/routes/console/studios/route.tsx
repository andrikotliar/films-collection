import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getStudiosListQueryOptions, useDeleteStudio } from '~/shared';
import { AddItemButton, ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { StudioForm } from '~/routes/console/studios/-components';
import { studioInitialValues } from '~/routes/console/studios/-configs';
import type z from 'zod';
import type { StudioFormSchema } from '~/routes/console/studios/-schemas';

export const Route = createFileRoute('/console/studios')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getStudiosListQueryOptions());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data } = useSuspenseQuery(getStudiosListQueryOptions());

  const [studio, setStudio] = useState<z.infer<typeof StudioFormSchema> | null>(null);

  const { mutateAsync: deleteStudio, isPending: isDeletePending } = useDeleteStudio();

  return (
    <ConsoleContentLayout title="Studios" backPath="/console">
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
