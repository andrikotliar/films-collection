import { AwardsApi } from '@/api';
import {
  BackLink,
  ConfirmModal,
  ConsoleContent,
  ConsoleTitle,
} from '@/components';
import { NEW_ITEM_ID } from '@/constants';
import { fetchAwardsBaseDataListQuery } from '@/queries';
import { AddItemLink, List } from '@/routes/console/-components';
import { Award } from '@/types';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/console/general_/awards')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchAwardsBaseDataListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const navigate = Route.useNavigate();
  const { data, refetch } = useSuspenseQuery(fetchAwardsBaseDataListQuery());

  const [awardToDelete, setAwardToDelete] = useState<Pick<
    Award,
    'id' | 'title'
  > | null>(null);

  const { mutate: deleteAward, isPending: isDeleting } = useMutation({
    mutationFn: AwardsApi.deleteAward,
    onSuccess: () => {
      refetch();
      setAwardToDelete(null);
    },
  });

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
      <AddItemLink
        to="/console/general/awards/$id"
        params={{ id: NEW_ITEM_ID }}
      >
        Create award
      </AddItemLink>
      <List
        items={data}
        onDelete={setAwardToDelete}
        onEdit={(data) => handleOnEdit(data.id)}
      />
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
