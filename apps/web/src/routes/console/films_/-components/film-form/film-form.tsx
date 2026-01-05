import { Form, getInitialDataQueryOptions } from '~/shared';
import { type FilmFormValues } from '~/routes/console/films_/-types';
import { FilmFormSchema } from '~/routes/console/films_/-schemas';
import { PersonForm } from '~/routes/console/-shared';
import {
  AwardsSelect,
  CastAndCrewSelect,
  FilmValuesWatcher,
  TrailersSelect,
} from '~/routes/console/films_/-components/film-form/components';
import { FormModalProvider } from '~/routes/console/-shared/components/form-modal-provider/form-modal-provider';
import { useSuspenseQuery } from '@tanstack/react-query';

type FilmFormProps = {
  values: FilmFormValues;
};

export const FilmForm = ({ values }: FilmFormProps) => {
  const { data: initialOptions } = useSuspenseQuery(getInitialDataQueryOptions());

  const handleSubmit = async (_data: FilmFormValues) => {
    // eslint-disable-next-line
    console.log(_data);
  };

  return (
    <FormModalProvider form={PersonForm}>
      <Form
        onSubmit={handleSubmit}
        defaultValues={values}
        schema={FilmFormSchema}
        onReset={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        shouldShowResetButton
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
        <Form.RatingInput name="rating" label="Rating" size={3} />
        <Form.FileInput label="Poster" name="poster" />
        <Form.Select label="Genres" name="genres" options={initialOptions.options.genres} isMulti />
        <Form.Select
          label="Countries"
          name="countries"
          options={initialOptions.options.countries}
          isMulti
        />
        <Form.Select
          label="Studios"
          name="studios"
          options={initialOptions.options.studios}
          isMulti
        />
        <Form.Select
          label="Collections"
          name="collections"
          options={initialOptions.options.collections}
          isMulti
        />
        <Form.TextInput name="runtime" type="number" label="Runtime (min)" min="0" />
        <Form.DatePicker name="releaseDate" label="Release Date" />
        <Form.TextInput name="budget" label="Budget" type="number" min="0" />
        <Form.TextInput name="boxOffice" label="Box Office" type="number" min="0" />
        <Form.TextEditor name="description" label="Description" />
        <CastAndCrewSelect positionOptions={initialOptions.options.roles} />
        <AwardsSelect awardOptions={initialOptions.options.awards} />
        <TrailersSelect />
        <Form.Checkbox name="isDraft" type="checkbox" label="Draft" />
        <FilmValuesWatcher id={values.id} />
      </Form>
    </FormModalProvider>
  );
};
