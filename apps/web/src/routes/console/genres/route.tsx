import { api, getEmptyFormValues, getGenresListQueryOptions, type Input } from '~/shared';
import { List, useFormModal, withFormModal } from '~/routes/console/-shared';
import { createFileRoute } from '@tanstack/react-router';
import { GenresForm } from '~/routes/console/genres/-components';
import { mutationOptions, useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/console/genres')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(getGenresListQueryOptions());
  },
  component: withFormModal(GenresForm, PageContainer),
  staticData: {
    title: 'Genres',
    backPath: '/console',
  },
});

const genreDefaultValues = getEmptyFormValues<Input<typeof api.genres.create.exec>>({
  title: '',
});

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.genres.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: [
        { queryKey: api.genres.getList.staticKey },
        { queryKey: api.initialData.get.staticKey },
      ],
    },
  });
};

function PageContainer() {
  const { data, isFetching } = useQuery(getGenresListQueryOptions());
  const { onOpen } = useFormModal();

  return (
    <List
      data={data}
      getDeleteMutationOptions={getDeleteMutationOptions}
      onEdit={onOpen}
      onCreate={() => onOpen(genreDefaultValues)}
      createItemTitle="New genre"
      isFetching={isFetching}
    />
  );
}
