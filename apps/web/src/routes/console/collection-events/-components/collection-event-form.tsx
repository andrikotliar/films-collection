import type z from 'zod';
import {
  api,
  Form,
  type FormComponentProps,
  useMutateCollectionEvent,
  useSuspenseInitialData,
} from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { Dates } from '~/routes/console/collection-events/-components';
import { CollectionEventFormSchema } from '~/routes/console/collection-events/route';

type CollectionEventFormProps = FormComponentProps<z.infer<typeof CollectionEventFormSchema>>;

export const CollectionEventForm = ({ values, afterSubmitEffect }: CollectionEventFormProps) => {
  const { data } = useSuspenseInitialData();

  const { mutateAsync, isPending } = useMutateCollectionEvent();

  const title = getFormTitle(values, 'Collection Event');

  const submit = async (data: z.infer<typeof CollectionEventFormSchema>) => {
    await mutateAsync({
      ...data,
      endDateCode: data.isOneDayEvent ? data.startDateCode : data.endDateCode,
    });
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
      schema={CollectionEventFormSchema}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
      <Form.Select
        label="Collection"
        options={data?.options.collections ?? []}
        name="collectionId"
      />
      <Dates />
      <Form.AsyncSelect
        name="titleFilmId"
        optionsLoader={api.films.options.list}
        label="Title film"
      />
      <Form.TextInput name="yearFrom" label="First event occurrence year" placeholder="E.g. 2020" />
    </Form>
  );
};
