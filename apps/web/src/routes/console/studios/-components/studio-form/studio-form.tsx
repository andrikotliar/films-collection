import { Form, type FormComponentProps, useMutateStudio } from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import type z from 'zod';
import { StudioFormSchema } from '~/routes/console/studios/-schemas';

type StudioFormProps = FormComponentProps<z.infer<typeof StudioFormSchema>>;

export const StudioForm = ({ values, afterSubmitEffect }: StudioFormProps) => {
  const { mutateAsync, isPending } = useMutateStudio();

  const submit = async (data: z.infer<typeof StudioFormSchema>) => {
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
      schema={StudioFormSchema}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};
