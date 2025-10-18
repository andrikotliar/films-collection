import { Form, FormTextInput } from '@/components';
import { type FormComponentProps } from '@/common';
import { useMutatePerson, type PersonMutationPayload } from '@/hooks';
import { personSchema } from '@/routes/console/-common/components/person-form/validation';
import { getFormTitle } from '@/routes/console/-common/helpers';

export type PersonFormProps = FormComponentProps<PersonMutationPayload>;

export const PersonForm = ({ values, afterSubmitEffect }: PersonFormProps) => {
  const { mutateAsync, isPending } = useMutatePerson();

  const title = getFormTitle(values, 'Person', 'name');

  const submit = async (data: PersonMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={personSchema}
      title={title}
      isLoading={isPending}
    >
      <FormTextInput name="name" label="Person name" />
    </Form>
  );
};
