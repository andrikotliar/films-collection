import { fetchGenresListQuery, useDeleteGenre, type GenreMutationPayload } from '~/common';
import { AddItemButton, ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { GenresForm } from '~/routes/console/general_/genres/-components';
import { genreDefaultValues } from '~/routes/console/general_/genres/-configs';

export const Route = createFileRoute('/console/general_/genres')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchGenresListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data } = useSuspenseQuery(fetchGenresListQuery());

  const [genre, setGenre] = useState<GenreMutationPayload | null>(null);

  const { mutateAsync: deleteGenre, isPending: isDeletePending } = useDeleteGenre();

  return (
    <ConsoleContentLayout
      title="Genres"
      backPath="/console/general"
      backPathTitle="Back to categories"
    >
      <AddItemButton onClick={() => setGenre(genreDefaultValues)}>Create genre</AddItemButton>
      <List
        items={data}
        onDelete={deleteGenre}
        onEdit={setGenre}
        isDeletingInProgress={isDeletePending}
      />
      <FormModal
        values={genre}
        onClose={() => setGenre(null)}
        afterSubmitEffect={() => setGenre(null)}
        form={GenresForm}
      />
    </ConsoleContentLayout>
  );
}
