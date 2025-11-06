import { Form, useMutateGenre, type FormComponentProps, type GenreMutationPayload } from '~/lib';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { genresFormValidation } from '~/routes/console/general_/genres/-validation';

type GenresFormProps = FormComponentProps<GenreMutationPayload>;

export const GenresForm = ({ values, afterSubmitEffect }: GenresFormProps) => {
  const { mutateAsync, isPending } = useMutateGenre();

  const submit = async (data: GenreMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const title = getFormTitle(values, 'Genre');

  return (
    <Form
      onSubmit={submit}
      title={title}
      defaultValues={values}
      schema={genresFormValidation}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};
