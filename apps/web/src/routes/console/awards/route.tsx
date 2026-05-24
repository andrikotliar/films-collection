import { CommonListQuerySchema } from '@films-collection/shared';
import { mutationOptions, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback } from 'react';
import { List } from '~/routes/console/-shared';
import { api, getAwardsBaseDataListQueryOptions } from '~/shared';

export const Route = createFileRoute('/console/awards')({
  validateSearch: (search) => CommonListQuerySchema.parse(search),
  loader: async ({ context: { queryClient }, location }) => {
    await queryClient.ensureQueryData(getAwardsBaseDataListQueryOptions(location.search));
  },
  component: PageContainer,
  staticData: {
    title: 'Awards',
    backPath: '/console',
  },
  head: () => ({
    meta: [
      {
        title: 'Awards - Films Collection',
      },
    ],
  }),
});

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.awards.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: { queryKey: api.awards.getList.staticKey },
    },
  });
};

function PageContainer() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isFetching } = useQuery(getAwardsBaseDataListQueryOptions(search));

  const handleOnEdit = (id: number) => {
    navigate({
      to: '/console/awards/$id',
      params: {
        id: id.toString(),
      },
    });
  };

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
      onEdit={(data) => handleOnEdit(data.id)}
      isFetching={isFetching}
      onNavigateToForm="/console/awards/$id"
      createItemTitle="New award"
      onPageChange={handlePageChange}
    />
  );
}
