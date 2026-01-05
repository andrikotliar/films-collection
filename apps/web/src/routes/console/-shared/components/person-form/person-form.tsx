import {
  type FormComponentProps,
  api,
  Form,
  FormIdParamSchema,
  mutateEntity,
  queryKeys,
} from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import type z from 'zod';
import { CreatePersonSchema } from '@films-collection/shared';
import { useFormModal } from '~/routes/console/-shared/context';
import { useMutation } from '@tanstack/react-query';

export const PersonFormSchema = CreatePersonSchema.extend({
  id: FormIdParamSchema,
});

export type PersonFormProps = FormComponentProps<z.infer<typeof PersonFormSchema>>;

export const PersonForm = ({ values }: PersonFormProps) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.people.create, api.people.patch),
    meta: {
      invalidateQueries: [queryKeys.people.list()],
    },
  });
  const { onClose } = useFormModal();

  const submit = async (data: z.infer<typeof PersonFormSchema>) => {
    await mutateAsync(data);
    onClose();
  };

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={PersonFormSchema}
      title={getFormTitle(values, 'Person', 'name')}
      isLoading={isPending}
    >
      <Form.TextInput name="name" label="Person name" />
    </Form>
  );
};
