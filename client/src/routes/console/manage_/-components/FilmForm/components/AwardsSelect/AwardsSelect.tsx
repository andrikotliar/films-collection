import styles from './AwardsSelect.module.css';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormAward, FormValues } from '@/routes/console/manage_/-types';
import { ListOption } from '@/types';
import { Button, FormSection, FormSelect, FormTextInput } from '@/ui';
import { NominationSelect } from './components';
import { PlusIcon, Trash2Icon } from 'lucide-react';

type AwardsSelectProps = {
  awardOptions: ListOption<number>[];
};

const defaultAward: FormAward = {
  awardId: null,
  nominationId: null,
  person: null,
  comment: null,
};

export const AwardsSelect: FC<AwardsSelectProps> = ({ awardOptions }) => {
  const { control } = useFormContext<FormValues>();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'awards',
  });

  return (
    <FormSection label="Awards">
      <div className={styles.wrapper}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.awardSelection}>
            <div className={styles.formInputs}>
              <FormSelect
                name={`awards.${index}.awardId`}
                options={awardOptions}
                label="Award"
              />
              <NominationSelect index={index} onActorSelect={update} />
              <FormTextInput name={`awards.${index}.comment`} label="Comment" />
            </div>
            <Button
              icon={<Trash2Icon />}
              onClick={() => remove(index)}
              variant="ghost"
            />
          </div>
        ))}
        <div>
          <Button
            onClick={() => append(defaultAward)}
            icon={<PlusIcon />}
            variant="ghost"
          >
            Add award
          </Button>
        </div>
      </div>
    </FormSection>
  );
};
