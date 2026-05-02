import { filmStatusOptions } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import type z from 'zod';
import {
  DescriptionEditor,
  filmDefaultFormValues,
  FilmFormSchema,
  getFormTitle,
  useFormModal,
  useManageFilm,
} from '~/routes/console/-shared';
import {
  SeriesExtension,
  TrailersSelect,
} from '~/routes/console/films_/-components/film-form/components';
import { api, Form, getInitialDataQueryOptions, type FormComponentProps } from '~/shared';

type PartialFilmFormProps = FormComponentProps<z.infer<typeof FilmFormSchema>>;

export const PartialFilmForm = ({ values }: PartialFilmFormProps) => {
  const { mutateAsync, isPending } = useManageFilm({
    values,
    invalidateQueries: [
      {
        queryKey: [api.films.getAdminIncompleteFilmsList.staticKey],
      },
      {
        queryKey: [api.films.getDashboard.staticKey],
      },
    ],
  });
  const { data: initialOptions } = useSuspenseQuery(getInitialDataQueryOptions());

  const { onClose } = useFormModal();

  const submit = async (data: z.infer<typeof FilmFormSchema>) => {
    await mutateAsync(data);
    onClose();
  };

  return (
    <Form
      onSubmit={submit}
      defaultValues={{ ...filmDefaultFormValues, ...values }}
      schema={FilmFormSchema}
      isLoading={isPending}
      title={getFormTitle(values, 'Film')}
    >
      <Form.TextInput name="title" label="Title" />
      <Form.Select name="status" options={filmStatusOptions} label="Status" />
      <Form.DatePicker name="releaseDate" label="Release Date" />
      <Form.CheckboxesGroup
        label="Type"
        name="type"
        options={initialOptions.options.types}
        type="radio"
      />
      <Form.CheckboxesGroup
        label="Styles"
        name="style"
        options={initialOptions.options.styles}
        type="radio"
      />
      <SeriesExtension shouldShowDateSelector={false} />
      <DescriptionEditor />
      <TrailersSelect />
    </Form>
  );
};
