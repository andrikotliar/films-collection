import { useRef } from 'react';
import { api, Form, toaster, type EditorRef } from '~/shared';
import styles from './description-editor.module.css';
import { useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/-shared/schemas';
import sanitize from 'sanitize-html';
import { useMutation } from '@tanstack/react-query';

export const DescriptionEditor = () => {
  const editorRef = useRef<EditorRef | null>(null);

  const { setValue, getValues } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const updateOverview = (text: string) => {
    setValue('overview', text);
    editorRef.current?.setContent(text);
  };

  const { mutate: translateText, isPending } = useMutation({
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
          langParams: {
            from: 'Ukrainian',
            to: 'English',
          },
        },
      });

      updateOverview(result.translatedText);
    },
  });

  const { mutate: generateDescription, isPending: isTextGenerationInProgress } = useMutation({
    mutationFn: async () => {
      const values = getValues();

      if (!values.title.length) {
        toaster.error('Provide title before description generation request');
        return;
      }

      const response = await api.films.generateDescription.exec({
        input: { request: `${values.type} "${values.title}"` },
      });

      updateOverview(response.text);
    },
  });

  const isInProgress = isPending || isTextGenerationInProgress;

  return (
    <div className={styles.editor_container}>
      <Form.TextEditor
        name="overview"
        label="Description"
        ref={editorRef}
        menuOptions={[
          {
            title: 'Generate description',
            action: () => generateDescription(),
          },
          {
            title: 'Translate text',
            action: () => translateText(),
          },
        ]}
      />
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
  );
};
