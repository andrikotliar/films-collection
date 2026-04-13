import type { Enum, FilmStatus } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import type z from 'zod';
import {
  filmDefaultFormValues,
  FilmFormSchema,
  getFormTitle,
  useFormModal,
  useManageFilm,
} from '~/routes/console/-shared';
import {
  TrailersSelect,
  TranslateDescription,
} from '~/routes/console/films_/-components/film-form/components';
import { api, Form, getInitialDataQueryOptions, type FormComponentProps } from '~/shared';

type PartialFilmFormProps = FormComponentProps<
  z.infer<typeof FilmFormSchema>,
  {
    status: Enum<typeof FilmStatus>;
    title: string;
  }
>;

export const PartialFilmForm = ({ values, status, title }: PartialFilmFormProps) => {
  const { mutateAsync, isPending } = useManageFilm({
    values,
    status,
    invalidateQueries: {
      queryKey: [api.films.getAdminIncompleteFilmsList.staticKey],
    },
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
      title={getFormTitle(values, title)}
    >
      <Form.TextInput name="title" label="Title" />
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
      <TranslateDescription />
      <Form.FileInput label="Poster" name="poster" />
      <TrailersSelect />
      <Form.Select
        label="Collections"
        name="collections"
        options={initialOptions.options.collections}
        isMulti
      />
      <Form.DatePicker name="releaseDate" label="Release Date" />
    </Form>
  );
};
