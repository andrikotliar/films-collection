import styles from './film-form.module.css';
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
} from '@/components';
import { InitialData } from '@/common';
import {
  AwardsSelect,
  ChapterSelect,
  CastAndCrewSelect,
  TrailersSelect,
} from './components';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '@/routes/console/manage_/-types';
import { filmDefaultFormValues } from '@/routes/console/manage_/-configs';

type FilmFormProps = {
  filmId: string | number;
  onSubmit: VoidFunction;
  initialOptions: InitialData;
};

export const FilmForm = ({
  onSubmit,
  initialOptions,
  filmId,
}: FilmFormProps) => {
  const { reset } = useFormContext<FormValues>();

  const handleResetForm = () => {
    reset(filmDefaultFormValues);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
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
      <div className={styles.revenue}>
        <FormTextInput name="budget" label="Budget" type="number" min="0" />
        <FormTextInput
          name="boxOffice"
          label="Box Office"
          type="number"
          min="0"
        />
      </div>
      <FormTextEditor name="description" label="Description" />
      <CastAndCrewSelect positionOptions={initialOptions.options.roles} />
      <AwardsSelect awardOptions={initialOptions.options.awards} />
      <TrailersSelect />
      <ChapterSelect filmId={filmId} />
      <div className={styles.buttons}>
        <Button type="submit">Save</Button>
        <FormCheckbox name="isDraft" type="checkbox" label="Draft" />
        <Button
          variant="secondary"
          className={styles.resetButton}
          onClick={handleResetForm}
        >
          Reset form
        </Button>
      </div>
    </form>
  );
};
