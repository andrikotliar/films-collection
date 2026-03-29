import type { ListOption } from '@films-collection/shared';
import { useState } from 'react';
import { api, Button, Form, Select, toaster } from '~/shared';
import styles from './translate-description.module.css';
import { LanguagesIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';
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

      setValue('overview', result.translatedText);
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.editor_container}>
        <Form.TextEditor name="overview" label="Description" />
        {isPending && (
          <div className={styles.overlay}>
            <div className={styles.loader}>
              Translating <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}
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
          isDisabled={isPending}
        >
          Translate
        </Button>
      </div>
    </div>
  );
};
