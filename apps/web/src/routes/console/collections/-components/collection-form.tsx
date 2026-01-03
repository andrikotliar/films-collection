import {
  type FormComponentProps,
  useMutateCollection,
  Form,
  type FormValues,
  type Input,
  type api,
  useInitialData,
  IdSchema,
} from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { CreateCollectionInputSchema } from '@films-collection/shared';
import type z from 'zod';

export const CollectionFormSchema = CreateCollectionInputSchema.extend({ id: IdSchema });

type CollectionFormProps = FormComponentProps<z.infer<typeof CollectionFormSchema>>;

export const CollectionForm = ({ values, afterSubmitEffect }: CollectionFormProps) => {
  const { data } = useInitialData();

  const { mutateAsync, isPending } = useMutateCollection();

  const submit = async (data: FormValues<Input<typeof api.collections.create>>) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const title = getFormTitle(values, 'Collection');

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      title={title}
      schema={CollectionFormSchema}
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
