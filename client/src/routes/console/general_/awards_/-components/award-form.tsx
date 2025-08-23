import { Form, FormTextArea, FormTextInput } from '@/components';
import { useMutateAward, type AwardMutationPayload } from '@/hooks';
import { NominationsForm } from '@/routes/console/general_/awards_/-components/nominations-form';
import { awardFormSchema } from '@/routes/console/general_/awards_/-validation';

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
      <FormTextInput name="title" label="Title" />
      <FormTextArea name="description" label="Description" />
      <NominationsForm />
    </Form>
  );
};
