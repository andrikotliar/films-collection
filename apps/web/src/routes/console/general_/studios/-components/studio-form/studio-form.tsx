import {
  Form,
  type FormComponentProps,
  type StudioMutationPayload,
  useMutateStudio,
} from '~/common';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { studioFormValidation } from '~/routes/console/general_/studios/-validation';

type StudioFormProps = FormComponentProps<StudioMutationPayload>;

export const StudioForm = ({ values, afterSubmitEffect }: StudioFormProps) => {
  const { mutateAsync, isPending } = useMutateStudio();

  const submit = async (data: StudioMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const title = getFormTitle(values, 'Studio');

  return (
    <Form
      onSubmit={submit}
      isLoading={isPending}
      title={title}
      defaultValues={values}
      schema={studioFormValidation}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};
