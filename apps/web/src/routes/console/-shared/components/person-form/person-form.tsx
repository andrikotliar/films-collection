import { type FormComponentProps, Form, IdSchema, useMutatePerson } from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import type z from 'zod';
import { CreatePersonSchema } from '@films-collection/shared';

export const PersonFormSchema = CreatePersonSchema.extend({
  id: IdSchema,
});

export type PersonFormProps = FormComponentProps<z.infer<typeof PersonFormSchema>>;

export const PersonForm = ({ values, afterSubmitEffect }: PersonFormProps) => {
  const { mutateAsync, isPending } = useMutatePerson();

  const title = getFormTitle(values, 'Person', 'name');

  const submit = async (data: z.infer<typeof PersonFormSchema>) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={PersonFormSchema}
      title={title}
      isLoading={isPending}
    >
      <Form.TextInput name="name" label="Person name" />
    </Form>
  );
};
