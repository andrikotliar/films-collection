import { createFileRoute } from '@tanstack/react-router';
import { AddItemLink, ConsoleContentLayout, List } from '~/routes/console/-shared';
import {
  getAwardsBaseDataListQueryOptions,
  useDeleteAward,
  useSuspenseAwardsBaseDataList,
} from '~/shared';
import { NEW_ITEM_ID } from '@films-collection/shared';

export const Route = createFileRoute('/console/awards')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getAwardsBaseDataListQueryOptions());
  },
  component: PageContainer,
});

function PageContainer() {
  const navigate = Route.useNavigate();
  const { data } = useSuspenseAwardsBaseDataList();

  const { mutateAsync: deleteAward, isPending: isDeleting } = useDeleteAward();

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
