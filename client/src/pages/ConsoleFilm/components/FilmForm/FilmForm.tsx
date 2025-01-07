import styles from './FilmForm.module.css';
import { Button, FormCheckboxesGroup, FormTextInput, FormUrlInput } from '@/ui';
import { FC } from 'react';
import { FormRow } from '../FormRow/FormRow';
import { useQueryClient } from '@tanstack/react-query';
import { InitialData } from '@/types';
import { ListType } from '@/enums';

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
      <FormUrlInput
        name="poster"
        baseUrl={import.meta.env.VITE_BASE_MEDIA_URL}
        type="image"
        label="Poster"
      />
      <FormUrlInput
        name="trailer"
        baseUrl="https://www.youtube-nocookie.com/embed/"
        type="video"
        label="Trailer"
      />
      <FormRow>
        <Button type="submit">Create</Button>
      </FormRow>
    </form>
  );
};
