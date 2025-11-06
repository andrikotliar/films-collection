import {
  Form,
  fetchInitialDataQuery,
  type FormComponentProps,
  useMutateCollectionEvent,
  type CollectionEventMutationPayload,
} from '~/lib';
import { useQuery } from '@tanstack/react-query';
import { FilmsApi } from '~/api';
import { collectionEventSchema } from '~/routes/console/collection-events/-validation';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { Dates } from '~/routes/console/collection-events/-components';

type CollectionEventFormProps = FormComponentProps<CollectionEventMutationPayload>;

export const CollectionEventForm = ({ values, afterSubmitEffect }: CollectionEventFormProps) => {
  const { data } = useQuery(fetchInitialDataQuery());

  const { mutateAsync, isPending } = useMutateCollectionEvent();

  const title = getFormTitle(values, 'Collection Event');

  const submit = async (data: CollectionEventMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  return (
    <Form
      onSubmit={submit}
      defaultValues={{
        ...values,
        isOneDayEvent: values.startDateCode === values.endDateCode,
      }}
      title={title}
      schema={collectionEventSchema}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
      <Form.Select
        label="Collection"
        options={data?.options.collections ?? []}
        name="collectionId"
      />
      <Dates />
      <Form.AsyncSelect name="titleFilmId" optionsLoader={FilmsApi.getOptions} label="Title film" />
      <Form.TextInput name="yearFrom" label="First event occurrence year" placeholder="E.g. 2020" />
    </Form>
  );
};
