import { Form, IdSchema, useMutateCountry, type FormComponentProps } from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { CountryInputSchema } from '@films-collection/shared';
import type z from 'zod';

export const CountryFormSchema = CountryInputSchema.extend({
  id: IdSchema,
});

type CountryFormProps = FormComponentProps<z.infer<typeof CountryFormSchema>>;

export const CountryForm = ({ values, afterSubmitEffect }: CountryFormProps) => {
  const { mutateAsync, isPending } = useMutateCountry();

  const submit = async (data: z.infer<typeof CountryFormSchema>) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const title = getFormTitle(values, 'Country');

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={CountryFormSchema}
      isLoading={isPending}
      title={title}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};
