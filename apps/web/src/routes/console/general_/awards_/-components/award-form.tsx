import { Form, useMutateAward, type api, type ExtractInputParams } from '~/shared';
import { NominationsForm } from '~/routes/console/general_/awards_/-components/nominations-form/nominations-form';
import { CreateAwardInputSchema } from '@films-collection/shared';

type AwardFormProps = {
  values: ExtractInputParams<typeof api.awards.create>;
};

export const AwardForm = ({ values }: AwardFormProps) => {
  const { mutateAsync, isPending } = useMutateAward();

  return (
    <Form
      onSubmit={mutateAsync}
      defaultValues={values}
      schema={CreateAwardInputSchema}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
      <Form.TextArea name="description" label="Description" />
      <NominationsForm />
    </Form>
  );
};
