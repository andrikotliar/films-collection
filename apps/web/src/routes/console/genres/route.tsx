import { api, getEmptyFormValues, getGenresListQueryOptions, type Input } from '~/shared';
import { List, useFormModal, withFormModal } from '~/routes/console/-shared';
import { createFileRoute } from '@tanstack/react-router';
import { GenresForm } from '~/routes/console/genres/-components';
import { mutationOptions, useQuery } from '@tanstack/react-query';
import { CommonListQuerySchema } from '@films-collection/shared';
import { useCallback } from 'react';

export const Route = createFileRoute('/console/genres')({
  validateSearch: (search) => CommonListQuerySchema.parse(search),
  loader: async ({ context: { queryClient }, location }) => {
    return await queryClient.ensureQueryData(getGenresListQueryOptions(location.search));
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
  const search = Route.useSearch();
  const { data, isFetching } = useQuery(getGenresListQueryOptions(search));
  const { onOpen } = useFormModal();
  const navigate = Route.useNavigate();

  const handlePageChange = (index: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex: index,
      }),
    });
  };

  const handleSearch = useCallback((value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        q: value,
      }),
    });
  }, []);

  return (
    <List
      data={data}
      onSearch={handleSearch}
      getDeleteMutationOptions={getDeleteMutationOptions}
      onEdit={onOpen}
      onCreate={() => onOpen(genreDefaultValues)}
      createItemTitle="New genre"
      isFetching={isFetching}
      onPageChange={handlePageChange}
    />
  );
}
