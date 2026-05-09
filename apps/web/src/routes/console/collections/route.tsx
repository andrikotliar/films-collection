import { createFileRoute } from '@tanstack/react-router';
import { getCollectionsListQueryOptions, getEmptyFormValues, api, type Input } from '~/shared';
import { List, useFormModal, withFormModal } from '~/routes/console/-shared';
import { CollectionForm } from '~/routes/console/collections/-components';
import type z from 'zod';
import type { CollectionFormSchema } from '~/routes/console/collections/-schemas';
import { useSuspenseQuery } from '@tanstack/react-query';

const collectionFormDefaultValues = getEmptyFormValues<Input<typeof api.collections.create.exec>>({
  title: '',
  category: 'GENERAL',
});

export const Route = createFileRoute('/console/collections')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getCollectionsListQueryOptions());
  },
  component: withFormModal(CollectionForm, PageContainer),
  staticData: {
    title: 'Collections',
    backPath: '/console',
  },
});

const getDeleteMutationsOptions = () => {
  return {
    mutationFn: (id: number) => api.collections.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: {
        queryKey: api.collections.getList.staticKey,
      },
    },
  };
};

function PageContainer() {
  const { data, isFetching } = useSuspenseQuery(getCollectionsListQueryOptions());
  const { onOpen } = useFormModal<z.infer<typeof CollectionFormSchema>>();

  return (
    <List
      data={{ list: data }}
      getDeleteMutationOptions={getDeleteMutationsOptions}
      onEdit={onOpen}
      isFetching={isFetching}
      onCreate={() => onOpen(collectionFormDefaultValues)}
      createItemTitle="New collection"
    />
  );
}
