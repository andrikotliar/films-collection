import { api, Form, mutateEntity, type FormComponentProps } from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import type z from 'zod';
import { GenreFormSchema } from '~/routes/console/genres/-schemas';
import { useMutation } from '@tanstack/react-query';
import { useFormModal } from '~/routes/console/-shared';

type GenresFormProps = FormComponentProps<z.infer<typeof GenreFormSchema>>;

export const GenresForm = ({ values }: GenresFormProps) => {
  const { onClose } = useFormModal();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.genres.create.exec, api.genres.update.exec),
    meta: {
      invalidateQueries: [api.genres.getList.staticKey, api.initialData.get.staticKey],
    },
  });

  const submit = async (data: z.infer<typeof GenreFormSchema>) => {
    await mutateAsync(data);
    onClose();
  };

  return (
    <Form
      onSubmit={submit}
      title={getFormTitle(values, 'Genre')}
      defaultValues={values}
      schema={GenreFormSchema}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};
