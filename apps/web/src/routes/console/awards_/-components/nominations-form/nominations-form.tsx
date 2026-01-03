import styles from './nominations-form.module.css';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Button, ConfirmModal, Form, type api, type Input } from '~/shared';
import { nominationDefaultValues } from '~/routes/console/awards_/-configs';

export const NominationsForm = () => {
  const [nominationIndex, setNominationIndex] = useState<number | null>(null);

  const { control } = useFormContext<Input<typeof api.awards.create>>();

  const { fields, append, remove } = useFieldArray({
    name: 'nominations',
    control,
  });

  return (
    <Form.Section label="Nominations">
      <div className={styles.nominations_form}>
        {fields.map((_, index) => (
          <div className={styles.nomination} key={index}>
            <div className={styles.nomination_title}>
              <Form.TextInput name={`nominations.${index}.title`} label="Nomination title" />
            </div>
            <div className={styles.nomination_toggle}>
              <Form.Toggle
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
        <ConfirmModal
          title={`Delete ${fields[nominationIndex ?? 0]?.title}?`}
          data={nominationIndex}
          onClose={() => setNominationIndex(null)}
          onConfirm={(index) => {
            remove(index);
            setNominationIndex(null);
          }}
        />
      </div>
    </Form.Section>
  );
};
