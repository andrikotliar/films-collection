import {
  fetchCollectionEventsQuery,
  getDateMonthLabel,
  type CollectionEventFilled,
} from '@/common';
import { createFileRoute } from '@tanstack/react-router';
import { CollectionEventForm } from '@/routes/console/collection-events/-components';
import { Button, ConsoleContent, ConsoleTitle } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormModal, List } from '@/routes/console/-common';
import { getDefaultValues } from '@/routes/console/collection-events/-configs';
import { useDeleteCollectionEvent, type CollectionEventMutationPayload } from '@/hooks';
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
    </ConsoleContent>
  );
};

export const Route = createFileRoute('/console/collection-events')({
  component: CollectionEventsContainer,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(fetchCollectionEventsQuery());
  },
});
