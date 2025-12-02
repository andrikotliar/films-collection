import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { AddItemLink, ConsoleContentLayout, List } from '~/routes/console/-shared';
import {
  type Award,
  NEW_ITEM_ID,
  fetchAwardsBaseDataListQuery,
  ConfirmModal,
  useDeleteAward,
} from '~/shared';

export const Route = createFileRoute('/console/general_/awards')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchAwardsBaseDataListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(fetchAwardsBaseDataListQuery());

  const [awardToDelete, setAwardToDelete] = useState<Pick<Award, 'id' | 'title'> | null>(null);

  const { mutateAsync: deleteAward, isPending: isDeleting } = useDeleteAward();

  const handleOnEdit = (id: number) => {
    navigate({
      to: '/console/general/awards/$id',
      params: {
        id: id.toString(),
      },
    });
  };

  return (
    <ConsoleContentLayout
      title="Awards"
      backPath="/console/general"
      backPathTitle="Back to categories"
    >
      <AddItemLink to="/console/general/awards/$id" params={{ id: NEW_ITEM_ID }}>
        Create award
      </AddItemLink>
      <List items={data} onDelete={deleteAward} onEdit={(data) => handleOnEdit(data.id)} />
      <ConfirmModal
        title={`Delete ${awardToDelete?.title}?`}
        description="All related nominations will be deleted"
        data={awardToDelete}
        onClose={() => setAwardToDelete(null)}
        onConfirm={(data) => deleteAward(data.id)}
        isPending={isDeleting}
      />
    </ConsoleContentLayout>
  );
}
