import { NEW_ITEM_ID } from '@films-collection/shared';
import { mutationOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { List, useFormModal, withFormModal } from '~/routes/console/-shared';
import { HobbyForm } from '~/routes/console/hobbies/-components';
import { api, getHobbiesListQueryOptions, queryKey } from '~/shared';

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.hobbies.deleteHobby({ params: { id } }),
    meta: {
      invalidateQueries: [{ queryKey: queryKey('hobbies.getHobbiesList') }],
    },
  });
};

export const Route = createFileRoute('/console/hobbies')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getHobbiesListQueryOptions());
  },
  component: withFormModal(HobbyForm, RouteComponent),
  staticData: {
    title: 'Hobbies',
    backPath: '/console',
  },
  head: () => ({
    meta: [
      {
        title: 'Hobbies - Films Collection',
      },
    ],
  }),
});

function RouteComponent() {
  const { onOpen } = useFormModal();
  const { data } = useSuspenseQuery(getHobbiesListQueryOptions());

  const navigate = useNavigate();

  return (
    <List
      data={{ list: data.list, total: 0 }}
      getDeleteMutationOptions={getDeleteMutationOptions}
      isFetching={false}
      onEdit={onOpen}
      onCreate={() => onOpen({ title: '', id: NEW_ITEM_ID })}
      onView={(item) =>
        navigate({ to: '/console/hobbies/$id', params: { id: item.id.toString() } })
      }
    />
  );
}
