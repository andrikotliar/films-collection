import styles from './CreatePendingFilmForm.module.css';
import { Button, FormTextInput } from '@/components';
import { SaveIcon } from 'lucide-react';
import { FC, FormEventHandler } from 'react';

type CreatePendingFilmFormProps = {
  onSubmit: FormEventHandler;
};

export const CreatePendingFilmForm: FC<CreatePendingFilmFormProps> = ({
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      <h2 className={styles.title}>Add pending film</h2>
      <div className={styles.formContent}>
        <FormTextInput
          name="title"
          label="Title"
          className={styles.titleInput}
        />
        <FormTextInput
          name="priority"
          label="Priority"
          type="number"
          className={styles.priorityInput}
        />
      </div>
      <Button type="submit" icon={<SaveIcon />}>
        Save
      </Button>
    </form>
  );
};
