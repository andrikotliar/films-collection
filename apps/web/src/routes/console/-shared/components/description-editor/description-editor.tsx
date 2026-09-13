import { api, Button, Form, toaster } from '~/shared';
import styles from './description-editor.module.css';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { LanguagesIcon } from 'lucide-react';

type DescriptionEditorProps = {
  name: string;
  label: string;
};

export const DescriptionEditor = ({ name, label }: DescriptionEditorProps) => {
  const { setValue, getValues } = useFormContext();

  const { mutate: translateText, isPending } = useMutation({
    mutationFn: async () => {
      const values = getValues();

      if (!values[name]) {
        toaster.warning('Description is empty. Skip translation');

        return;
      }

      const result = await api.films.translateDescription({
        input: {
          text: values[name],
        },
      });

      setValue(name, result.translatedText);
    },
  });

  return (
    <div className={styles.editor_container}>
      <Form.TextArea name={name} label={label} isLoading={isPending} />
      <div className={styles.buttons}>
        <Button
          icon={<LanguagesIcon />}
          onClick={() => translateText()}
          size="small"
          variant="light"
          isDisabled={isPending}
        >
          Translate {label}
        </Button>
      </div>
    </div>
  );
};
