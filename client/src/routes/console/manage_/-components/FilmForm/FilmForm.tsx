import styles from './FilmForm.module.css';
import {
  Button,
  FormCheckboxesGroup,
  FormTextInput,
  FormTextEditor,
  FormRatingInput,
  FormDatePicker,
  FormCheckbox,
  FormSelect,
  FormFileInput,
} from '@/ui';
import { FC } from 'react';
import { InitialData } from '@/types';
import { FormRow } from '../FormRow/FormRow';
import { CrewSelect } from '../CrewSelect/CrewSelect';
import { Trailers } from '../Trailers/Trailers';
import { CastSelect } from '../CastSelect/CastSelect';

type FilmFormProps = {
  onSubmit: VoidFunction;
  initialOptions: InitialData;
};

export const FilmForm: FC<FilmFormProps> = ({ onSubmit, initialOptions }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormTextInput name="title" label="Title" />
      <FormRow gap={40}>
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
      </FormRow>
      <FormFileInput label="Poster" name="poster" />
      <FormSelect
        label="Genres"
        name="genres"
        options={initialOptions.options.genres}
        isMulti
      />
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
      <FormTextInput
        name="runtime"
        type="number"
        label="Runtime (min)"
        min="0"
      />
      <FormDatePicker name="releaseDate" label="Release Date" />
      <FormRow gap={20}>
        <FormTextInput name="budget" label="Budget" type="number" min="0" />
        <FormTextInput
          name="boxOffice"
          label="Box Office"
          type="number"
          min="0"
        />
      </FormRow>
      <FormTextEditor name="description" label="Description" />
      <CrewSelect positionOptions={initialOptions.options.roles} />
      <CastSelect />
      <Trailers />
      <FormRow align="center" gap={20}>
        <Button type="submit">Save</Button>
        <FormCheckbox name="isDraft" type="checkbox" label="Draft" />
      </FormRow>
    </form>
  );
};
