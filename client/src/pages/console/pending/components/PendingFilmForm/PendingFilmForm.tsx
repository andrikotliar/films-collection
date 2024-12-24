import styles from './PendingFilmForm.module.css';
import { priorityOptions } from '@/configs';
import { Button, FormTextInput, FormStatusFilterButton } from '@/components';
import { LoaderCircle, SaveIcon } from 'lucide-react';
import { FC, FormEventHandler } from 'react';
import { FormItemLabel } from '@/components/FormItemLabel/FormItemLabel';
import { StatusColor } from '@/types';

type PendingFilmFormProps = {
  title: string;
  onSubmit: FormEventHandler;
  isSaving: boolean;
};

export const PendingFilmForm: FC<PendingFilmFormProps> = ({
  onSubmit,
  isSaving,
  title,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      <h2 className={styles.title}>{title}</h2>
      <FormTextInput name="title" label="Title" className={styles.titleInput} />
      <div>
        <FormItemLabel>Priority</FormItemLabel>
        <div className={styles.priorities}>
          {priorityOptions.map((option) => (
            <FormStatusFilterButton
              name="priority"
              title={option.label}
              value={String(option.value)}
              key={option.value}
              color={option.color as StatusColor}
            />
          ))}
        </div>
      </div>
      <Button
        type="submit"
        icon={isSaving ? <LoaderCircle className="spin" /> : <SaveIcon />}
      >
        Save
      </Button>
    </form>
  );
};
