import { Form, useMutateAward, type AwardMutationPayload } from '~/shared';
import { NominationsForm } from '~/routes/console/general_/awards_/-components/nominations-form/nominations-form';
import { awardFormSchema } from '~/routes/console/general_/awards_/-validation';

type AwardFormProps = {
  values: AwardMutationPayload;
};

export const AwardForm = ({ values }: AwardFormProps) => {
  const { mutateAsync, isPending } = useMutateAward();

  return (
    <Form
      onSubmit={mutateAsync}
      defaultValues={values}
      schema={awardFormSchema}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
      <Form.TextArea name="description" label="Description" />
      <NominationsForm />
    </Form>
  );
};
