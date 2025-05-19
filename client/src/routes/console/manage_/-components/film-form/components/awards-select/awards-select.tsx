import styles from './awards-select.module.css';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PlusIcon } from 'lucide-react';
import { FormAward, FormValues } from '@/routes/console/manage_/-types';
import { ListOption } from '@/types';
import { Button, FormSection } from '@/components';
import { AwardBlock } from './components';

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
          <AwardBlock
            key={field.id}
            index={index}
            onFieldRemove={remove}
            onFieldUpdate={update}
            awardOptions={awardOptions}
          />
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
