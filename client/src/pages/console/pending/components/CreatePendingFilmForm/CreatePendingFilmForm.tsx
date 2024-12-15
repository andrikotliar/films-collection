import styles from './CreatePendingFilmForm.module.css';
import { Button, FormSelect, FormTextInput } from '@/components';
import { Priority } from '@/enums';
import { SaveIcon } from 'lucide-react';
import { FC, FormEventHandler } from 'react';

type CreatePendingFilmFormProps = {
  onSubmit: FormEventHandler;
};

const prioritySelectOptions = [
  {
    label: Priority.LOW,
    value: 1,
  },
  {
    label: Priority.MEDIUM,
    value: 2,
  },
  {
    label: Priority.HIGH,
    value: 3,
  },
];

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
        <FormSelect
          name="priority"
          label="Priority"
          className={styles.prioritySelect}
          options={prioritySelectOptions}
        />
      </div>
      <Button type="submit" icon={<SaveIcon />}>
        Save
      </Button>
    </form>
  );
};
