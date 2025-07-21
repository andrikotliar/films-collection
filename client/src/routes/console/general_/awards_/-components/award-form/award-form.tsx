import { useState } from 'react';
import styles from './award-form.module.css';
import {
  Button,
  ConfirmModal,
  FormTextArea,
  FormTextInput,
  FormToggle,
  Panel,
} from '@/components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AwardFormValues } from '@/routes/console/general_/awards_/-types';
import { PlusIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { nominationDefaultValues } from '@/routes/console/general_/awards_/-configs';

type AwardFormProps = {
  isLoading: boolean;
  onSubmit: VoidFunction;
};

export const AwardForm = ({ isLoading, onSubmit }: AwardFormProps) => {
  const [nominationIndex, setNominationIndex] = useState<number | null>(null);

  const { control } = useFormContext<AwardFormValues>();

  const { fields, append, remove } = useFieldArray({
    name: 'nominations',
    control,
  });

  return (
    <Panel>
      <form className={styles.form} onSubmit={onSubmit}>
        <FormTextInput name="title" label="Title" />
        <FormTextArea name="description" label="Description" />
        <div className={styles.nominations}>
          <h3>Nominations</h3>
          {fields.map((_, index) => (
            <div className={styles.nominationRow} key={index}>
              <div className={styles.textInputWrapper}>
                <FormTextInput
                  name={`nominations.${index}.title`}
                  label="Nomination title"
                />
              </div>
              <div className={styles.toolsWrapper}>
                <FormToggle
                  title="Should include actor"
                  name={`nominations.${index}.shouldIncludeActor`}
                />
                <Button
                  variant="ghost"
                  icon={<Trash2Icon />}
                  onClick={() => setNominationIndex(index)}
                />
              </div>
            </div>
          ))}
          <div>
            <Button
              variant="ghost"
              icon={<PlusIcon />}
              onClick={() => append(nominationDefaultValues)}
            >
              Add nomination
            </Button>
          </div>
        </div>
        <Button type="submit" icon={<SaveIcon />} isLoading={isLoading}>
          Save
        </Button>
      </form>
      <ConfirmModal
        title={`Delete ${fields[nominationIndex ?? 0]?.title}?`}
        data={nominationIndex}
        onClose={() => setNominationIndex(null)}
        onConfirm={(index) => {
          remove(index);
          setNominationIndex(null);
        }}
      />
    </Panel>
  );
};
