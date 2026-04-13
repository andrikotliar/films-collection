import type { ListOption } from '@films-collection/shared';
import { useRef, useState } from 'react';
import { api, Button, Form, Select, toaster, type EditorRef } from '~/shared';
import styles from './translate-description.module.css';
import { LanguagesIcon, PenIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/-shared/schemas';
import sanitize from 'sanitize-html';
import { useMutation } from '@tanstack/react-query';

type TranslateParams = {
  from: string;
  to: string;
};

const fromOptions: ListOption<string>[] = [
  {
    label: 'Ukrainian',
    value: 'Ukrainian',
  },
];

const toOptions: ListOption<string>[] = [
  {
    label: 'English',
    value: 'English',
  },
];

export const TranslateDescription = () => {
  const editorRef = useRef<EditorRef | null>(null);
  const [translateParams, setTranslateParams] = useState<TranslateParams>({
    from: 'Ukrainian',
    to: 'English',
  });

  const { setValue, getValues } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const setFromOption = (value: string) => {
    setTranslateParams((params) => ({
      ...params,
      from: value,
    }));
  };

  const setToOption = (value: string) => {
    setTranslateParams((params) => ({
      ...params,
      to: value,
    }));
  };

  const updateOverview = (text: string) => {
    setValue('overview', text);
    editorRef.current?.setContent(text);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const values = getValues();

      if (!values.overview) {
        toaster.warning('Description is empty. Skip translation');

        return;
      }

      const sanitizedText = sanitize(values.overview, { allowedTags: [] });

      if (!sanitizedText.length) {
        toaster.warning('Description is empty. Skip translation');

        return;
      }

      const result = await api.films.translateDescription.exec({
        input: {
          text: sanitizedText,
          langParams: translateParams,
        },
      });

      updateOverview(result.translatedText);
    },
  });

  const { mutate: generateDescription, isPending: isTextGenerationInProgress } = useMutation({
    mutationFn: async () => {
      const values = getValues();

      if (!values.title.length) {
        toaster.error('Provide tile before description generation request');
        return;
      }

      const response = await api.films.generateDescription.exec({
        input: { request: values.title },
      });

      updateOverview(response.text);
    },
  });

  const isInProgress = isPending || isTextGenerationInProgress;

  return (
    <div className={styles.wrapper}>
      <div className={styles.editor_container}>
        <Form.TextEditor name="overview" label="Description" ref={editorRef} />
        {isInProgress && (
          <div className={styles.overlay}>
            <div className={styles.loader}>
              Working <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}
      </div>
      <div>
        <Button icon={<PenIcon />} onClick={() => generateDescription()} isDisabled={isInProgress}>
          Generate description
        </Button>
      </div>
      <div className={styles.translation}>
        <Select
          options={fromOptions}
          onSelect={setFromOption}
          isDisabled
          value={translateParams.from}
        />
        <span>—</span>
        <Select options={toOptions} onSelect={setToOption} isDisabled value={translateParams.to} />
        <Button
          type="button"
          icon={<LanguagesIcon />}
          onClick={() => mutate()}
          isDisabled={isInProgress}
        >
          Translate
        </Button>
      </div>
    </div>
  );
};
