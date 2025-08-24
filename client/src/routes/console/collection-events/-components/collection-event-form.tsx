import { FormTextInput, FormSelect, FormAsyncSelect, Form } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { fetchInitialDataQuery, type FormComponentProps } from '@/common';
import { FilmsApi } from '@/api';
import { useMutateCollectionEvent, type CollectionEventMutationPayload } from '@/hooks';
import { collectionEventSchema } from '@/routes/console/collection-events/-validation';
import { getFormTitle } from '@/routes/console/-common/helpers';
import { Dates } from '@/routes/console/collection-events/-components';

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
      defaultValues={values}
      title={title}
      schema={collectionEventSchema}
      isLoading={isPending}
    >
      <FormTextInput name="title" label="Title" />
      <FormSelect
        label="Collection"
        options={data?.options.collections ?? []}
        name="collectionId"
      />
      <Dates />
      <FormAsyncSelect name="titleFilmId" optionsLoader={FilmsApi.getOptions} label="Title film" />
      <FormTextInput name="yearFrom" label="First event occurrence year" placeholder="E.g. 2020" />
    </Form>
  );
};
