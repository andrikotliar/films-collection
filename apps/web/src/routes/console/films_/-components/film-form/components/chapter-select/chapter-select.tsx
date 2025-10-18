import styles from './chapter-select.module.css';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { type FilmFormValues } from '~/routes/console/films_/-types';
import {
  FieldError,
  FormSection,
  FormSelect,
  Loader,
  TextInput,
  Toggle,
  debounce,
  fetchChapterKeysOptionsQuery,
} from '~/common';
import { Chapters } from './components';

type ChapterSelectProps = {
  filmId: string | number;
};

const chapterKeyRegex = /^[a-z-]+$/;

export const ChapterSelect = ({ filmId }: ChapterSelectProps) => {
  const parsedFilmId = typeof filmId === 'number' ? Number(filmId) : null;

  const [manualKeyError, setManualKeyError] = useState<string | null>(null);

  const { data, isLoading } = useQuery(fetchChapterKeysOptionsQuery());

  const { watch, setValue } = useFormContext<FilmFormValues>();

  const chapterKey = watch('chapterKey');
  const shouldUseExistingKey = watch('shouldUseExistingKey');

  const shouldFetchChapters = useMemo(() => {
    if (!data || !chapterKey) {
      return false;
    }

    const existingChapterKey = data.find((key) => key.value === chapterKey);

    if (!existingChapterKey) {
      return false;
    }

    return true;
  }, [chapterKey, data]);

  const handleChangeKeyInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setManualKeyError(null);
    const value = event.target.value;

    if (value.length && !chapterKeyRegex.test(value)) {
      setManualKeyError('Key should contain only letters in lowercase and hyphens');
      return;
    }

    if (!value.length) {
      setValue('chapterKey', null);
      return;
    }

    setValue('chapterKey', value);
  }, []);

  if (isLoading) {
    return <Loader size={20} />;
  }

  if (!data) {
    return <div>Chapter keys not found</div>;
  }

  const handleToggleMode = (value: boolean) => {
    setValue('shouldUseExistingKey', value);
    setValue('chapterOrder', null);
    setValue('chapterKey', null);
  };

  const debouncedHandleChangeKeyInput = debounce(handleChangeKeyInput, 1000);

  return (
    <FormSection label="Chapters">
      <div className={styles.toggle}>
        <Toggle value={shouldUseExistingKey} onToggle={handleToggleMode} title="Use existing key" />
      </div>
      {shouldUseExistingKey ? (
        <FormSelect name="chapterKey" options={data} label="Chapter key" />
      ) : (
        <div>
          <TextInput
            label="Chapter key"
            placeholder="Write a key"
            defaultValue={chapterKey ?? ''}
            onChange={debouncedHandleChangeKeyInput}
          />
          <FieldError error={manualKeyError} />
        </div>
      )}
      {chapterKey && (
        <div className={styles.chaptersWrapper}>
          <div className={styles.hint}>Select a chapter after which to put the current film</div>
          <Chapters chapterKey={chapterKey} filmId={parsedFilmId} isEnabled={shouldFetchChapters} />
        </div>
      )}
    </FormSection>
  );
};
