import { Form, IdSchema, useMutateAward, type api, type Input } from '~/shared';
import { NominationsForm } from '~/routes/console/awards_/-components/nominations-form/nominations-form';
import { CreateAwardInputSchema } from '@films-collection/shared';

type AwardFormProps = {
  values: Input<typeof api.awards.create>;
};

const AwardFormSchema = CreateAwardInputSchema.extend({
  id: IdSchema,
});

export const AwardForm = ({ values }: AwardFormProps) => {
  const { mutateAsync, isPending } = useMutateAward();

  return (
    <Form
      onSubmit={mutateAsync}
      defaultValues={values}
      schema={AwardFormSchema}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
      <Form.TextArea name="description" label="Description" />
      <NominationsForm />
    </Form>
  );
};
