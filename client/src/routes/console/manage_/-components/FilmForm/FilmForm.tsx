import styles from './FilmForm.module.css';
import {
  Button,
  FormCheckboxesGroup,
  FormTextInput,
  FormSelect,
  FormImageInput,
  FormTextEditor,
  FormRatingInput,
  FormDatePicker,
} from '@/ui';
import { FC } from 'react';
import { FormRow } from '../FormRow/FormRow';
import { useQueryClient } from '@tanstack/react-query';
import { InitialData } from '@/types';

type FilmFormProps = {
  onSubmit: VoidFunction;
};

export const FilmForm: FC<FilmFormProps> = ({ onSubmit }) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<InitialData>(['initial-data']);

  if (!data) {
    return <div>Form options doesn't exist, reload the page.</div>;
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormTextInput name="title" label="Title" />
      <FormRow gap={40}>
        <FormCheckboxesGroup
          label="Type"
          name="type"
          options={data.options.types}
          type="radio"
        />
        <FormCheckboxesGroup
          label="Styles"
          name="style"
          options={data.options.styles}
          type="radio"
        />
        <FormRatingInput name="rating" label="Rating" size={3} />
      </FormRow>
      <FormRow gap={40}>
        <div className={styles.posterWrapper}>
          <FormImageInput name="poster" label="Poster" previewWidth={250} />
        </div>
      </FormRow>
      <FormSelect
        label="Genres"
        options={data.options.genres}
        name="genres"
        isMulti
      />
      <FormSelect
        label="Countries"
        options={data.options.countries}
        name="countries"
        isMulti
      />
      <FormTextInput
        name="runtime"
        type="number"
        label="Runtime (min)"
        min="0"
      />
      <FormDatePicker name="releaseDate" label="Release Date" />
      <FormRow gap={40}>
        <FormTextInput name="budget" label="Budget" type="number" min="0" />
        <FormTextInput
          name="boxOffice"
          label="Box Office"
          type="number"
          min="0"
        />
      </FormRow>
      <FormTextEditor name="description" label="Description" />
      <FormRow align="center" gap={20}>
        {/* <Button type="submit">Create</Button> */}
      </FormRow>
    </form>
  );
};
