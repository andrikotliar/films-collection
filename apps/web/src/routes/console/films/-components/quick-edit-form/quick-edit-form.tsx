import { useMutation, useQuery } from '@tanstack/react-query';
import type z from 'zod';
import { useFormModal } from '~/routes/console/-shared';
import { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { DescriptionEditor } from '~/routes/console/films_/-components/film-form/components';
import {
  api,
  FieldError,
  Form,
  getAdminFilmDetailsQueryOptions,
  getObjectsDiff,
  Loader,
  queryKey,
  type FormComponentProps,
} from '~/shared';

type QuickEditFormProps = FormComponentProps<{ id: number }>;

export const QuickEditForm = ({ values }: QuickEditFormProps) => {
  const { data, isLoading } = useQuery(getAdminFilmDetailsQueryOptions(values.id));

  const { onClose: closeQuickEditForm } = useFormModal();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (formValues: z.infer<typeof FilmFormSchema>) => {
      const diff = getObjectsDiff(data, formValues);

      if (!diff) {
        return;
      }

      return await api.films.update({
        params: { id: values.id },
        input: diff,
      });
    },
    onSuccess: closeQuickEditForm,
    meta: {
      invalidateQueries: { queryKey: queryKey('films.getAdminList') },
    },
  });

  if (isLoading) {
    return <Loader size={40} />;
  }

  if (!data) {
    return <FieldError error="Film not found" />;
  }

  return (
    <Form
      schema={FilmFormSchema}
      defaultValues={{ ...data, id: values.id }}
      onSubmit={mutateAsync}
      title="Film quick edit"
      isLoading={isPending}
    >
      <Form.TextInput name="title" />
      <DescriptionEditor />
      <Form.RatingInput name="rating" size={3} />
      <Form.Checkbox label="Draft" name="draft" type="checkbox" />
    </Form>
  );
};
