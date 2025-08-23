import { Button, Form, FormSelect, FormTextArea, FormTextInput } from '@/components';
import { useMutateCollection, type CollectionMutationPayload } from '@/hooks';
import { fetchInitialDataQuery, type FormComponentProps } from '@/common';
import { useQuery } from '@tanstack/react-query';
import { getFormTitle } from '@/routes/console/-common/helpers';
import { SaveIcon } from 'lucide-react';
import { collectionSchema } from '@/routes/console/general_/collections/-validation';

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
    <Form onSubmit={submit} defaultValues={values} title={title} schema={collectionSchema}>
      <FormTextInput type="text" name="title" />
      <FormSelect
        label="Category"
        options={data?.options.collectionCategories ?? []}
        name="category"
        isSearchable={false}
      />
      <FormTextArea label="Description" name="description" />
      <Button isLoading={isPending} type="submit" icon={<SaveIcon />}>
        Save
      </Button>
    </Form>
  );
};
