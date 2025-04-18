import styles from './FilmForm.module.css';
import {
  Button,
  FormCheckboxesGroup,
  FormTextInput,
  FormTextEditor,
  FormRatingInput,
  FormDatePicker,
  FormCheckbox,
  FormSection,
  FormVideoInput,
  SortableList,
  FormSelect,
  FormFileInput,
} from '@/ui';
import { FC } from 'react';
import { FormRow } from '../FormRow/FormRow';
import { InitialData } from '@/types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PlusIcon } from 'lucide-react';
import { FormValues } from '../../-types';
import { DragEndEvent } from '@dnd-kit/core';

type FilmFormProps = {
  onSubmit: VoidFunction;
  initialOptions: InitialData;
};

export const FilmForm: FC<FilmFormProps> = ({ onSubmit, initialOptions }) => {
  const { control, watch } = useFormContext<FormValues>();
  const {
    fields: trailers,
    append: appendTrailers,
    move: resortTrailers,
  } = useFieldArray({ control, name: 'trailers' });

  const type = watch('type');

  const trailerLabel = type === 'SERIES' ? 'Season' : 'Trailer #';

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = trailers.findIndex((field) => field.id === active.id);
    const newIndex = trailers.findIndex((field) => field.id === over.id);

    resortTrailers(oldIndex, newIndex);
  };

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
      <FormFileInput label="File input" name="poster" />
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
      <FormSection label={`Trailers (${trailers.length})`}>
        <SortableList items={trailers} onDragEnd={handleDragEnd}>
          {({ index }) => (
            <FormVideoInput
              name={`trailers.${index}.videoId`}
              label={`${trailerLabel} ${index + 1}`}
            />
          )}
        </SortableList>
        <Button
          className={styles.appendButton}
          icon={<PlusIcon />}
          variant="ghost"
          onClick={() =>
            appendTrailers({
              videoId: '',
              order: trailers.length + 1,
            })
          }
        >
          Add trailer
        </Button>
      </FormSection>
      <FormRow align="center" gap={20}>
        <Button type="submit">Save</Button>
        <FormCheckbox name="isDraft" type="checkbox" label="Draft" />
      </FormRow>
    </form>
  );
};
