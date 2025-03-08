import styles from './Description.module.css';
import { Button, FieldLabel, FormTextArea, FormTextInput } from '@/ui';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormValues } from '../../types';
import { PlusIcon, Trash2Icon } from 'lucide-react';

export const Description = () => {
  const { control } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'description',
  });

  return (
    <div className={styles.wrapper}>
      <FieldLabel>Descriptions</FieldLabel>
      {fields.map((field, index) => (
        <div className={styles.row} key={field.id}>
          <div className={styles.rowInputs}>
            <FormTextInput
              name={`description.${index}.title`}
              label="Section title"
            />
            <FormTextArea
              name={`description.${index}.text`}
              label="Section description"
              rows={8}
            />
          </div>
          <button onClick={() => remove(index)}>
            <Trash2Icon size={20} />
          </button>
        </div>
      ))}
      <Button
        variant="ghost"
        icon={<PlusIcon />}
        onClick={() =>
          append({
            title: null,
            text: '',
          })
        }
      >
        Add description section
      </Button>
    </div>
  );
};
