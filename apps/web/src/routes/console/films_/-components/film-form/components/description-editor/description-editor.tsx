import { api, Button, Form, toaster } from '~/shared';
import styles from './description-editor.module.css';
import { useFormContext } from 'react-hook-form';
import type z from 'zod';
import { useMutation } from '@tanstack/react-query';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { LanguagesIcon } from 'lucide-react';

export const DescriptionEditor = () => {
  const { setValue, getValues } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const { mutate: translateText, isPending } = useMutation({
    mutationFn: async () => {
      const values = getValues();

      if (!values.synopsis) {
        toaster.warning('Description is empty. Skip translation');

        return;
      }

      const result = await api.films.translateDescription({
        input: {
          text: values.synopsis,
        },
      });

      setValue('synopsis', result.translatedText);
    },
  });

  return (
    <div className={styles.editor_container}>
      <Form.TextArea name="synopsis" label="Description" isLoading={isPending} />
      <Button
        icon={<LanguagesIcon />}
        onClick={() => translateText()}
        size="small"
        variant="light"
        isDisabled={isPending}
      >
        Translate description
      </Button>
    </div>
  );
};
