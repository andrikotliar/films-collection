import { useState } from 'react';
import {
  fetchCollectionEventsQuery,
  getDateMonthLabel,
  type CollectionEventFilled,
  Button,
  useDeleteCollectionEvent,
  type CollectionEventMutationPayload,
} from '~/lib';
import { createFileRoute } from '@tanstack/react-router';
import { CollectionEventForm } from '~/routes/console/collection-events/-components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { getDefaultValues } from '~/routes/console/collection-events/-configs';
import { PlusIcon } from 'lucide-react';

const CollectionEventsContainer = () => {
  const [formValues, setFormValues] = useState<CollectionEventMutationPayload | null>(null);

  const { data } = useSuspenseQuery(fetchCollectionEventsQuery());

  const { mutateAsync: deleteEvent, isPending: isDeleting } = useDeleteCollectionEvent();

  const handleEditEvent = (data: CollectionEventFilled) => {
    setFormValues({
      ...data,
      collectionId: data.collection.id,
      titleFilmId: data.film.id,
      isOneDayEvent: data.startDateCode === data.endDateCode,
    });
  };

  return (
    <ConsoleContentLayout title="Collection Events">
      <div>
        <Button
          icon={<PlusIcon />}
          onClick={() => setFormValues(getDefaultValues())}
          variant="light"
        >
          Create event
        </Button>
      </div>
      <List
        items={data}
        onDelete={deleteEvent}
        onEdit={handleEditEvent}
        isDeletingInProgress={isDeleting}
        description={(data) => getDateMonthLabel(data)}
      />
      <FormModal
        values={formValues}
        onClose={() => setFormValues(null)}
        form={CollectionEventForm}
        afterSubmitEffect={() => setFormValues(null)}
      />
    </ConsoleContentLayout>
  );
};

export const Route = createFileRoute('/console/collection-events')({
  component: CollectionEventsContainer,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(fetchCollectionEventsQuery());
  },
});
