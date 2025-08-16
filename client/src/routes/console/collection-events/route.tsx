import { fetchCollectionEventsQuery, type CollectionEventFilled } from '@/common';
import { createFileRoute } from '@tanstack/react-router';
import { CollectionEventForm } from '@/routes/console/collection-events/-components';
import { Button, ConfirmModal, ConsoleContent, ConsoleTitle } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormModal, List } from '@/routes/console/-components';
import { getDefaultValues } from '@/routes/console/collection-events/-configs';
import { useDeleteCollectionEvent, type CollectionEventMutationPayload } from '@/hooks';
import { PlusIcon } from 'lucide-react';

type EventModifyContent = CollectionEventFilled | null;

const CollectionEventsContainer = () => {
  const [eventToDelete, setEventToDelete] = useState<EventModifyContent>(null);
  const [formValues, setFormValues] = useState<CollectionEventMutationPayload | null>(null);

  const { data } = useSuspenseQuery(fetchCollectionEventsQuery());

  const { mutateAsync: deleteEvent, isPending: isDeleting } = useDeleteCollectionEvent();

  const handleDeleteEvent = async (collectionEvent: CollectionEventFilled) => {
    await deleteEvent(collectionEvent.id);
    setEventToDelete(null);
  };

  const handleEditEvent = (data: CollectionEventFilled) => {
    setFormValues({
      ...data,
      collectionId: data.collection.id,
      titleFilmId: data.film.id,
      isOneDayEvent: data.startDate === data.endDate,
    });
  };

  return (
    <ConsoleContent>
      <ConsoleTitle>Collection Events</ConsoleTitle>
      <div>
        <Button
          icon={<PlusIcon />}
          onClick={() => setFormValues(getDefaultValues())}
          variant="light"
        >
          Create event
        </Button>
      </div>
      <List items={data} onDelete={handleDeleteEvent} onEdit={handleEditEvent} />
      <ConfirmModal
        data={eventToDelete}
        onConfirm={handleDeleteEvent}
        onClose={() => setEventToDelete(null)}
        confirmButtonTitle="Delete"
        confirmButtonVariant="danger"
        isPending={isDeleting}
      />
      <FormModal
        values={formValues}
        onClose={() => setFormValues(null)}
        form={CollectionEventForm}
      />
    </ConsoleContent>
  );
};

export const Route = createFileRoute('/console/collection-events')({
  component: CollectionEventsContainer,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(fetchCollectionEventsQuery());
  },
});
