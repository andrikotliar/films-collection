import {
  api,
  getEmptyFormValues,
  getGenresListQueryOptions,
  queryKeys,
  type Input,
} from '~/shared';
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

const genreDefaultValues = getEmptyFormValues<Input<typeof api.genres.create>>({
  title: '',
});

function PageContainer() {
  const { data: genres } = useSuspenseQuery(getGenresListQueryOptions());
  const { onOpen } = useFormModal();

  const { mutateAsync: deleteGenre, isPending: isDeletePending } = useMutation({
    mutationFn: (id: number) => api.genres.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.genres.list(), queryKeys.initialData.list()],
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
      />
    </ConsoleContentLayout>
  );
}
