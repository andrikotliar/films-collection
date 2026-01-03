import { getGenresListQueryOptions, useDeleteGenre, useSuspenseGenresList } from '~/shared';
import { AddItemButton, ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { GenresForm } from '~/routes/console/genres/-components';
import { genreDefaultValues } from '~/routes/console/genres/-configs';
import type z from 'zod';
import type { GenreFormSchema } from '~/routes/console/genres/-schemas';

export const Route = createFileRoute('/console/genres')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(getGenresListQueryOptions());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data: genres } = useSuspenseGenresList();

  const [genre, setGenre] = useState<z.infer<typeof GenreFormSchema> | null>(null);

  const { mutateAsync: deleteGenre, isPending: isDeletePending } = useDeleteGenre();

  return (
    <ConsoleContentLayout title="Genres" backPath="/console" backPathTitle="Back to categories">
      <AddItemButton onClick={() => setGenre(genreDefaultValues)}>Create genre</AddItemButton>
      <List
        items={genres}
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
