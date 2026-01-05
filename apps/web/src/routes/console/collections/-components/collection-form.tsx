import type z from 'zod';
import {
  type FormComponentProps,
  Form,
  api,
  getInitialDataQueryOptions,
  mutateEntity,
  queryKeys,
} from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CollectionFormSchema } from '~/routes/console/collections/-schemas';
import { useFormModal } from '~/routes/console/-shared';

type CollectionFormProps = FormComponentProps<z.infer<typeof CollectionFormSchema>>;

export const CollectionForm = ({ values }: CollectionFormProps) => {
  const { data } = useQuery(getInitialDataQueryOptions());
  const { onClose } = useFormModal();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.collections.create, api.collections.patch),
    meta: {
      invalidateQueries: [queryKeys.collections.list(), queryKeys.initialData.list()],
    },
  });

  const submit = async (data: z.infer<typeof CollectionFormSchema>) => {
    await mutateAsync(data);
    onClose();
  };

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      title={getFormTitle(values, 'Collection')}
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
