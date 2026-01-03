import { Form, useMutateGenre, type FormComponentProps } from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import type z from 'zod';
import { GenreFormSchema } from '~/routes/console/genres/-schemas';

type GenresFormProps = FormComponentProps<z.infer<typeof GenreFormSchema>>;

export const GenresForm = ({ values, afterSubmitEffect }: GenresFormProps) => {
  const { mutateAsync, isPending } = useMutateGenre();

  const submit = async (data: z.infer<typeof GenreFormSchema>) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const title = getFormTitle(values, 'Genre');

  return (
    <Form
      onSubmit={submit}
      title={title}
      defaultValues={values}
      schema={GenreFormSchema}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};
