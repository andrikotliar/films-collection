import { api, getEmptyFormValues, getGenresListQueryOptions, type Input } from '~/shared';
import {
  AddItemButton,
  ConsoleContentLayout,
  List,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';
import { createFileRoute } from '@tanstack/react-router';
import { GenresForm } from '~/routes/console/genres/-components';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/console/genres')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(getGenresListQueryOptions());
  },
  component: withFormModal(GenresForm, PageContainer),
});

const genreDefaultValues = getEmptyFormValues<Input<typeof api.genres.create.exec>>({
  title: '',
});

function PageContainer() {
  const { data: genres, isFetching } = useSuspenseQuery(getGenresListQueryOptions());
  const { onOpen } = useFormModal();

  const { mutateAsync: deleteGenre, isPending: isDeletePending } = useMutation({
    mutationFn: (id: number) => api.genres.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: [
        { queryKey: api.genres.getList.staticKey },
        { queryKey: api.initialData.get.staticKey },
      ],
    },
  });

  return (
    <ConsoleContentLayout title="Genres" backPath="/console">
      <AddItemButton onClick={() => onOpen(genreDefaultValues)}>Create genre</AddItemButton>
      <List
        items={genres}
        onDelete={deleteGenre}
        onEdit={onOpen}
        isDeletingInProgress={isDeletePending}
        isFetching={isFetching}
      />
    </ConsoleContentLayout>
  );
}
