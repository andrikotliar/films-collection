import { mutationOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { List } from '~/routes/console/-shared';
import { api, getAwardsBaseDataListQueryOptions } from '~/shared';

export const Route = createFileRoute('/console/awards')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getAwardsBaseDataListQueryOptions());
  },
  component: PageContainer,
  staticData: {
    title: 'Awards',
    backPath: '/console',
  },
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
  const navigate = Route.useNavigate();
  const { data, isFetching } = useSuspenseQuery(getAwardsBaseDataListQueryOptions());

  const handleOnEdit = (id: number) => {
    navigate({
      to: '/console/awards/$id',
      params: {
        id: id.toString(),
      },
    });
  };

  return (
    <List
      data={data}
      getDeleteMutationOptions={getDeleteMutationOptions}
      onEdit={(data) => handleOnEdit(data.id)}
      isFetching={isFetching}
      onNavigateToForm="/console/awards/$id"
      createItemTitle="New award"
    />
  );
}
