import { NEW_ITEM_ID } from '@films-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { AddItemLink, ConsoleContentLayout, List } from '~/routes/console/-shared';
import { api, getAwardsBaseDataListQueryOptions, queryKeys } from '~/shared';

export const Route = createFileRoute('/console/awards')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getAwardsBaseDataListQueryOptions());
  },
  component: PageContainer,
});

function PageContainer() {
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(getAwardsBaseDataListQueryOptions());

  const { mutateAsync: deleteAward, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => api.awards.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.awards.list()],
    },
  });

  const handleOnEdit = (id: number) => {
    navigate({
      to: '/console/awards/$id',
      params: {
        id: id.toString(),
      },
    });
  };

  return (
    <ConsoleContentLayout title="Awards" backPath="/console">
      <AddItemLink to="/console/awards/$id" params={{ id: NEW_ITEM_ID }}>
        Create award
      </AddItemLink>
      <List
        items={data}
        onDelete={deleteAward}
        onEdit={(data) => handleOnEdit(data.id)}
        isDeletingInProgress={isDeleting}
      />
    </ConsoleContentLayout>
  );
}
