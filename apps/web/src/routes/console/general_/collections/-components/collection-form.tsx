import {
  fetchInitialDataQuery,
  type FormComponentProps,
  useMutateCollection,
  type CollectionMutationPayload,
  Form,
} from '~/lib';
import { useQuery } from '@tanstack/react-query';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { collectionSchema } from '~/routes/console/general_/collections/-validation';

type CollectionFormProps = FormComponentProps<CollectionMutationPayload>;

export const CollectionForm = ({ values, afterSubmitEffect }: CollectionFormProps) => {
  const { data } = useQuery(fetchInitialDataQuery());

  const { mutateAsync, isPending } = useMutateCollection();

  const submit = async (data: CollectionMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const title = getFormTitle(values, 'Collection');

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      title={title}
      schema={collectionSchema}
      isLoading={isPending}
    >
      <Form.TextInput type="text" name="title" label="Title" />
      <Form.Select
        label="Category"
        options={data?.options.collectionCategories ?? []}
        name="category"
        isSearchable={false}
      />
      <Form.TextArea label="Description" name="description" />
    </Form>
  );
};
