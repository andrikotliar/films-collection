import { Form, useMutateAward, type AwardMutationPayload } from '~/lib';
import { NominationsForm } from '~/routes/console/general_/awards_/-components/nominations-form/nominations-form';
import { awardFormSchema } from '~/routes/console/general_/awards_/-validation';

type Props = {
  values: AwardMutationPayload;
};

export const AwardForm = ({ values }: Props) => {
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
