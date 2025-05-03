import styles from './AwardBlock.module.css';
import { FC } from 'react';
import { UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form';
import { FormValues } from '@/routes/console/manage_/-types';
import { ListOption } from '@/types';
import { Button, FormSelect, FormTextInput } from '@/ui';
import { NominationSelect } from '../NominationSelect/NominationSelect';
import { Trash2Icon } from 'lucide-react';

type AwardBlockProps = {
  index: number;
  awardOptions: ListOption<number>[];
  onFieldUpdate: UseFieldArrayUpdate<FormValues, 'awards'>;
  onFieldRemove: UseFieldArrayRemove;
};

export const AwardBlock: FC<AwardBlockProps> = ({
  index,
  awardOptions,
  onFieldRemove,
  onFieldUpdate,
}) => {
  return (
    <div className={styles.awardBlock}>
      <div className={styles.inputs}>
        <FormSelect
          name={`awards.${index}.awardId`}
          options={awardOptions}
          label="Award"
        />
        <NominationSelect index={index} onActorSelect={onFieldUpdate} />
        <FormTextInput name={`awards.${index}.comment`} label="Comment" />
      </div>
      <Button
        icon={<Trash2Icon />}
        onClick={() => onFieldRemove(index)}
        variant="ghost"
      />
    </div>
  );
};
