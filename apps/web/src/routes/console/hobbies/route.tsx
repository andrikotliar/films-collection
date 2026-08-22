import { mutationOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { List, useFormModal } from '~/routes/console/-shared';
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
  component: RouteComponent,
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

  return (
    <List
      data={{ list: data.list, total: 0 }}
      getDeleteMutationOptions={getDeleteMutationOptions}
      isFetching={false}
      onEdit={onOpen}
    />
  );
}
