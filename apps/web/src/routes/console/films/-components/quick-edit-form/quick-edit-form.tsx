import { useMutation, useQuery } from '@tanstack/react-query';
import type z from 'zod';
import { DescriptionEditor, useFormModal, validateLanguage } from '~/routes/console/-shared';
import { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';

import {
  api,
  FieldError,
  Form,
  getAdminFilmDetailsQueryOptions,
  getObjectsDiff,
  getUserDataQueryOptions,
  Loader,
  queryKey,
  type FormComponentProps,
} from '~/shared';

type QuickEditFormProps = FormComponentProps<{ id: number }>;

export const QuickEditForm = ({ values }: QuickEditFormProps) => {
  const { data, isLoading } = useQuery(getAdminFilmDetailsQueryOptions(values.id));
  const { data: user } = useQuery(getUserDataQueryOptions());

  const { onClose: closeQuickEditForm } = useFormModal();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (formValues: z.infer<typeof FilmFormSchema>) => {
      const diff = getObjectsDiff(data, formValues);

      if (!diff) {
        return;
      }

      validateLanguage(diff.synopsis, user);

      return await api.films.update({
        params: { id: values.id },
        input: diff,
      });
    },
    onSuccess: closeQuickEditForm,
    meta: {
      invalidateQueries: [
        { queryKey: queryKey('films.getAdminList') },
        { queryKey: queryKey('films.getEditableFilm', values.id) },
      ],
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
      <DescriptionEditor name="synopsis" label="Description" />
      <Form.RatingInput name="rating" size={3} />
      <Form.Checkbox label="Draft" name="draft" type="checkbox" />
    </Form>
  );
};
