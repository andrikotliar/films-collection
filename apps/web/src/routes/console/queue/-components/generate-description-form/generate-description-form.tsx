import { GenerateFilmDescriptionInputSchema } from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import { BookOpenCheckIcon } from 'lucide-react';
import { useState } from 'react';
import { api, Button, Form, Panel, type ApiResponse } from '~/shared';
import styles from './generate-description-form.module.css';

type GenerateDescriptionFormProps = {
  onAcceptDescription: (data: ApiResponse<typeof api.films.generateDescription.exec>) => void;
};

const defaultFormState = {
  filmTitle: '',
};

export const GenerateDescriptionForm = ({ onAcceptDescription }: GenerateDescriptionFormProps) => {
  const [generatedData, setGeneratedData] = useState<ApiResponse<
    typeof api.films.generateDescription.exec
  > | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (filmTitle: string) => {
      const response = await api.films.generateDescription.exec({ input: { filmTitle } });
      setGeneratedData(response);
    },
  });

  return (
    <Panel>
      <Form
        defaultValues={defaultFormState}
        onSubmit={(data) => mutateAsync(data.filmTitle)}
        schema={GenerateFilmDescriptionInputSchema}
        submitButtonText="Generate"
        submitIcon={<BookOpenCheckIcon />}
        isLoading={isPending}
      >
        <Form.TextInput label="Film Title" name="filmTitle" />
      </Form>
      {generatedData && (
        <div className={styles.description}>
          <p className={styles.text}>{generatedData.text}</p>
          <Button variant="light" onClick={() => onAcceptDescription(generatedData)}>
            Use generated description
          </Button>
        </div>
      )}
    </Panel>
  );
};
