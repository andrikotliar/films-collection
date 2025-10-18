import {
  BackLink,
  ConsoleContent,
  ConsoleTitle,
  fetchGenresListQuery,
  useDeleteGenre,
  type GenreMutationPayload,
} from '~/common';
import { AddItemButton, FormModal, List } from '~/routes/console/-common';
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
    <ConsoleContent>
      <BackLink path="/console/general">Back to categories</BackLink>
      <ConsoleTitle>Genres</ConsoleTitle>
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
    </ConsoleContent>
  );
}
