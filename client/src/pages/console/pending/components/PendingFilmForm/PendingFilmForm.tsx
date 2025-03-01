import styles from './PendingFilmForm.module.css';
import { priorityOptions } from '@/configs';
import {
  Button,
  FormTextInput,
  FormStatusFilterButton,
  FieldLabel,
  FormTitle,
} from '@/ui';
import { LoaderCircle, SaveIcon } from 'lucide-react';
import { FC, FormEventHandler } from 'react';
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
      <FormTitle>{title}</FormTitle>
      <FormTextInput name="title" label="Title" className={styles.titleInput} />
      <div>
        <FieldLabel>Priority</FieldLabel>
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
