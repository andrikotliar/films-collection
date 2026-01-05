import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  getDateMonthLabel,
  getCollectionEventsQueryOptions,
  api,
  queryKeys,
  type FormModalValues,
  getDefaultDateCode,
  getEmptyFormValues,
} from '~/shared';
import { CollectionEventForm } from '~/routes/console/collection-events/-components';
import {
  AddItemButton,
  ConsoleContentLayout,
  List,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';

const getCollectionEventDefaultValues = () => {
  const defaultDateCode = getDefaultDateCode();

  return getEmptyFormValues({
    title: '',
    collectionId: 0,
    startDateCode: defaultDateCode,
    endDateCode: defaultDateCode + 1,
    yearFrom: 0,
    isOneDayEvent: false,
    titleFilmId: 0,
  });
};

export const Route = createFileRoute('/console/collection-events')({
  component: withFormModal(CollectionEventForm, CollectionEventsContainer),
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(getCollectionEventsQueryOptions());
  },
});

function CollectionEventsContainer() {
  const { onOpen } = useFormModal<FormModalValues<typeof CollectionEventForm>>();

  const { data } = useSuspenseQuery(getCollectionEventsQueryOptions());

  const { mutateAsync: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => {
      return api.collectionEvents.remove({ params: { id } });
    },
    meta: {
      invalidateQueries: [queryKeys.collectionEvents.list(), queryKeys.initialData.list()],
    },
  });

  return (
    <ConsoleContentLayout title="Collection Events" backPath="/console">
      <AddItemButton onClick={() => onOpen(getCollectionEventDefaultValues())}>
        Create event
      </AddItemButton>
      <List
        items={data}
        onDelete={deleteEvent}
        onEdit={(values) =>
          onOpen({
            ...values,
            collectionId: values.collection.id,
            titleFilmId: values.film?.id ?? 0,
            isOneDayEvent: values.startDateCode === values.endDateCode,
          })
        }
        isDeletingInProgress={isDeleting}
        description={getDateMonthLabel}
      />
    </ConsoleContentLayout>
  );
}
