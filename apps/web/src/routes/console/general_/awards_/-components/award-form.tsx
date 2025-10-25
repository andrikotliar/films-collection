import {
  Form,
  FormTextArea,
  FormTextInput,
  useMutateAward,
  type AwardMutationPayload,
} from '~/common';
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
      <FormTextInput name="title" label="Title" />
      <FormTextArea name="description" label="Description" />
      <NominationsForm />
    </Form>
  );
};
