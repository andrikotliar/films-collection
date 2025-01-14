import styles from './FilmForm.module.css';
import {
  Button,
  FormCheckboxesGroup,
  FormTextInput,
  FormUrlInput,
  FormSelect,
} from '@/ui';
import { FC } from 'react';
import { FormRow } from '../FormRow/FormRow';
import { useQueryClient } from '@tanstack/react-query';
import { InitialData } from '@/types';
import { ListType, TitleType } from '@/enums';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../types';
import { VIDEO_SOURCE_BASE_URL } from '@/constants';
import { Description } from '../Description/Description';

type FilmFormProps = {
  onSubmit: VoidFunction;
};

export const FilmForm: FC<FilmFormProps> = ({ onSubmit }) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<InitialData>(['initial-data']);
  const { watch } = useFormContext<FormValues>();

  if (!data) {
    return <div>Form options doesn't exist, reload the page.</div>;
  }

  const titleType = watch('type');

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <FormTextInput name="title" label="Title" />
      <FormRow gap={40}>
        <FormCheckboxesGroup
          label="Type"
          name="type"
          options={data.options.general[ListType.TITLE_TYPES]}
          type="radio"
        />
        <FormCheckboxesGroup
          label="Styles"
          name="style"
          options={data.options.general[ListType.STYLES]}
          type="radio"
        />
      </FormRow>
      <FormRow gap={40}>
        <div className={styles.posterWrapper}>
          <FormUrlInput
            name="poster"
            baseUrl={import.meta.env.VITE_BASE_MEDIA_URL}
            type="image"
            label="Poster"
          />
        </div>
        {titleType === TitleType.FILM && (
          <FormUrlInput
            name="trailer"
            baseUrl={VIDEO_SOURCE_BASE_URL}
            type="video"
            label="Trailer"
          />
        )}
      </FormRow>
      <FormSelect
        label="Genres"
        options={data.options.general[ListType.GENRES].map((option) => ({
          label: option,
          value: option,
        }))}
        name="genres"
        isMulti
      />
      <FormTextInput
        name="runtime"
        type="number"
        label="Runtime (min)"
        min="0"
      />
      <FormTextInput
        name="releaseDate"
        label="Release Date"
        placeholder="YYYY-MM-DD"
      />
      <FormRow gap={40}>
        <FormTextInput name="budget" label="Budget" type="number" min="0" />
        <FormTextInput
          name="boxOffice"
          label="Box Office"
          type="number"
          min="0"
        />
      </FormRow>
      <FormRow gap={40}>
        <FormTextInput
          name="rating"
          type="number"
          label="Rating"
          min="1"
          max="3"
        />
        <FormTextInput
          name="watchCount"
          type="number"
          label="Watch Count"
          min="0"
          max="1000"
        />
      </FormRow>
      <Description />
      <FormRow align="center" gap={20}>
        <Button type="submit">Create</Button>
      </FormRow>
    </form>
  );
};
