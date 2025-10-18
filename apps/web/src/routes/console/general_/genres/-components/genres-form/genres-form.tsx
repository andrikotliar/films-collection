import type { FormComponentProps } from '~/common';
import { Form, FormTextInput } from '~/components';
import { useMutateGenre, type GenreMutationPayload } from '~/hooks/queries';
import { getFormTitle } from '~/routes/console/-common/helpers';
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
      <FormTextInput name="title" label="Title" />
    </Form>
  );
};
