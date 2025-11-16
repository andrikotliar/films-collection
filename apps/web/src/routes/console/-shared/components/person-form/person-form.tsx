import {
  type FormComponentProps,
  Form,
  useMutatePerson,
  type PersonMutationPayload,
} from '~/shared';
import { personSchema } from '~/routes/console/-shared/components/person-form/validation';
import { getFormTitle } from '~/routes/console/-shared/helpers';

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
      <Form.TextInput name="name" label="Person name" />
    </Form>
  );
};
