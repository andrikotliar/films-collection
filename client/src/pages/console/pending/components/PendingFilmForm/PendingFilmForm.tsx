import { prioritySelectOptions } from '@/configs';
import styles from './PendingFilmForm.module.css';
import { Button, FormSelect, FormTextInput } from '@/components';
import { LoaderCircle, SaveIcon } from 'lucide-react';
import { FC, FormEventHandler } from 'react';

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
      <div className={styles.formContent}>
        <FormTextInput
          name="title"
          label="Title"
          className={styles.titleInput}
        />
        <FormSelect
          name="priority"
          label="Priority"
          className={styles.prioritySelect}
          options={prioritySelectOptions}
        />
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
