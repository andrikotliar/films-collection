import {
  FormCheckboxesGroup,
  FormTextInput,
  FormTextEditor,
  FormRatingInput,
  FormDatePicker,
  FormCheckbox,
  FormSelect,
  FormFileInput,
  Form,
  fetchInitialDataQuery,
  type PersonMutationPayload,
} from '~/common';
import {
  AwardsSelect,
  ChapterSelect,
  CastAndCrewSelect,
  TrailersSelect,
  FilmValuesWatcher,
} from './components';
import { type FilmFormValues } from '~/routes/console/films_/-types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { filmFormSchema } from '~/routes/console/films_/-validation/film-form-schema';
import { useState } from 'react';
import { FormModal, PersonForm } from '~/routes/console/-shared';

type Props = {
  values: FilmFormValues;
};

export const FilmForm = ({ values }: Props) => {
  const { data: initialOptions } = useSuspenseQuery(fetchInitialDataQuery());
  const [person, setPerson] = useState<PersonMutationPayload | null>(null);

  const handleSubmit = async (_data: FilmFormValues) => {
    // eslint-disable-next-line
    console.log(_data);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        defaultValues={values}
        schema={filmFormSchema}
        onReset={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        shouldShowResetButton
      >
        <FormTextInput name="title" label="Title" />
        <FormCheckboxesGroup
          label="Type"
          name="type"
          options={initialOptions.options.types}
          type="radio"
        />
        <FormCheckboxesGroup
          label="Styles"
          name="style"
          options={initialOptions.options.styles}
          type="radio"
        />
        <FormRatingInput name="rating" label="Rating" size={3} />
        <FormFileInput label="Poster" name="poster" />
        <FormSelect label="Genres" name="genres" options={initialOptions.options.genres} isMulti />
        <FormSelect
          label="Countries"
          name="countries"
          options={initialOptions.options.countries}
          isMulti
        />
        <FormSelect
          label="Studios"
          name="studios"
          options={initialOptions.options.studios}
          isMulti
        />
        <FormSelect
          label="Collections"
          name="collections"
          options={initialOptions.options.collections}
          isMulti
        />
        <FormTextInput name="runtime" type="number" label="Runtime (min)" min="0" />
        <FormDatePicker name="releaseDate" label="Release Date" />
        <FormTextInput name="budget" label="Budget" type="number" min="0" />
        <FormTextInput name="boxOffice" label="Box Office" type="number" min="0" />
        <FormTextEditor name="description" label="Description" />
        <CastAndCrewSelect
          positionOptions={initialOptions.options.roles}
          onPersonChange={setPerson}
        />
        <AwardsSelect awardOptions={initialOptions.options.awards} />
        <TrailersSelect />
        <ChapterSelect filmId={values.id} />
        <FormCheckbox name="isDraft" type="checkbox" label="Draft" />
        <FilmValuesWatcher id={values.id} />
      </Form>
      <FormModal
        values={person}
        onClose={() => setPerson(null)}
        afterSubmitEffect={() => setPerson(null)}
        form={PersonForm}
      />
    </>
  );
};
