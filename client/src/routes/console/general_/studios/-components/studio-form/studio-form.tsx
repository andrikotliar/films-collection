import type { FormComponentProps } from '@/common';
import { Form, FormTextInput } from '@/components';
import { type StudioMutationPayload, useMutateStudio } from '@/hooks/queries';
import { getFormTitle } from '@/routes/console/-common/helpers';
import { studioFormValidation } from '@/routes/console/general_/studios/-validation';

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
      <FormTextInput name="title" label="Title" />
    </Form>
  );
};
