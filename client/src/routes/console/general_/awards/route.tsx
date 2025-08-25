import { BackLink, ConfirmModal, ConsoleContent, ConsoleTitle } from '@/components';
import { AddItemLink, List } from '@/routes/console/-common';
import { type Award, NEW_ITEM_ID, fetchAwardsBaseDataListQuery } from '@/common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useDeleteAward } from '@/hooks';

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
    <ConsoleContent>
      <BackLink path="/console/general">Back to categories</BackLink>
      <ConsoleTitle>Awards</ConsoleTitle>
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
    </ConsoleContent>
  );
}
