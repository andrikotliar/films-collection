import { mutationOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { List, useFormModal, withFormModal } from '~/routes/console/-shared';
import { HobbyItemForm } from '~/routes/console/hobbies_/-components';
import { getDefaultHobbyItem } from '~/routes/console/hobbies_/-configs';
import { api, getHobbyWithItemsQueryOptions, getInitialDataQueryOptions } from '~/shared';

const getDeleteHobbyItemMutations = (hobbyId: number) => {
  return () => {
    return mutationOptions({
      mutationFn: (itemId: number) =>
        api.hobbies.deleteHobbyItem({ params: { id: hobbyId, itemId } }),
    });
  };
};

export const Route = createFileRoute('/console/hobbies_/$id')({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(getInitialDataQueryOptions());
    return context.queryClient.ensureQueryData(getHobbyWithItemsQueryOptions(params.id));
  },
  component: withFormModal(HobbyItemForm, RouteComponent),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title} - Hobbies`,
      },
    ],
  }),
  staticData: {
    title: 'Hobby',
    backPath: '/console/hobbies',
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const { data, isLoading } = useSuspenseQuery(getHobbyWithItemsQueryOptions(params.id));

  const { onOpen } = useFormModal();

  return (
    <List
      data={{ list: data.items }}
      getDeleteMutationOptions={getDeleteHobbyItemMutations(Number(params.id))}
      isFetching={isLoading}
      onEdit={onOpen}
      onCreate={() => onOpen(getDefaultHobbyItem())}
      createItemTitle="Create hobby item"
    />
  );
}
