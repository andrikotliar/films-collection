import { createFileRoute } from '@tanstack/react-router';
import { mutationOptions, useQuery } from '@tanstack/react-query';
import {
  getDateMonthLabel,
  getCollectionEventsQueryOptions,
  api,
  type FormModalValues,
  getDefaultDateCode,
  getEmptyFormValues,
} from '~/shared';
import { CollectionEventForm } from '~/routes/console/collection-events/-components';
import { List, useFormModal, withFormModal } from '~/routes/console/-shared';

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
  staticData: {
    title: 'Collections Events',
    backPath: '/console',
  },
});

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationKey: [api.collectionEvents.delete.staticKey],
    mutationFn: (id: number) => {
      return api.collectionEvents.delete.exec({ params: { id } });
    },
    meta: {
      invalidateQueries: [
        {
          queryKey: api.collectionEvents.getAll.staticKey,
        },
        { queryKey: api.initialData.get.staticKey },
      ],
    },
  });
};

function CollectionEventsContainer() {
  const { onOpen } = useFormModal<FormModalValues<typeof CollectionEventForm>>();

  const { data, isFetching } = useQuery(getCollectionEventsQueryOptions());

  return (
    <List
      data={data}
      getDeleteMutationOptions={getDeleteMutationOptions}
      onEdit={(values) =>
        onOpen({
          ...values,
          collectionId: values.collectionId,
          titleFilmId: values.titleFilmId ?? 0,
          isOneDayEvent: values.startDateCode === values.endDateCode,
        })
      }
      description={getDateMonthLabel}
      isFetching={isFetching}
      onCreate={() => onOpen(getCollectionEventDefaultValues())}
    />
  );
}
