import z from 'zod';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import {
  getDateMonthLabel,
  Button,
  useDeleteCollectionEvent,
  getCollectionEventsQueryOptions,
  type api,
  type ApiResponse,
  IdSchema,
  useSuspenseCollectionEvents,
} from '~/shared';
import { createFileRoute } from '@tanstack/react-router';
import { CollectionEventForm } from '~/routes/console/collection-events/-components';
import { ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { getCollectionEventDefaultValues } from '~/routes/console/collection-events/-configs';
import { CreateCollectionEventInputSchema } from '@films-collection/shared';

export const CollectionEventFormSchema = CreateCollectionEventInputSchema.extend({
  id: IdSchema,
  isOneDayEvent: z.boolean().default(false),
});

export const Route = createFileRoute('/console/collection-events')({
  component: CollectionEventsContainer,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(getCollectionEventsQueryOptions());
  },
});

function CollectionEventsContainer() {
  const [formValues, setFormValues] = useState<z.infer<typeof CollectionEventFormSchema> | null>(
    null,
  );

  const { data } = useSuspenseCollectionEvents();

  const { mutateAsync: deleteEvent, isPending: isDeleting } = useDeleteCollectionEvent();

  const handleEditEvent = (data: ApiResponse<typeof api.collectionEvents.list>[number]) => {
    if (data.film) {
      setFormValues({
        ...data,
        collectionId: data.collection.id,
        titleFilmId: data.film.id,
        isOneDayEvent: data.startDateCode === data.endDateCode,
      });
    }
  };

  return (
    <ConsoleContentLayout title="Collection Events">
      <div>
        <Button
          icon={<PlusIcon />}
          onClick={() => setFormValues(getCollectionEventDefaultValues())}
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
}
