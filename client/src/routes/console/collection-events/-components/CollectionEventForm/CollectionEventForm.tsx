import { FC, FormEventHandler } from 'react';
import styles from './CollectionEventForm.module.css';
import {
  Button,
  FormTextInput,
  FormTitle,
  FormImageInput,
  FormSelect,
} from '@/ui';
import { LoaderCircle, SaveIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchInitialDataQuery } from '@/queries';
import { Island } from '@/ui/Island/Island';

type CollectionEventFormProps = {
  onSubmit: FormEventHandler;
  title: string;
  isSaving: boolean;
};

export const CollectionEventForm: FC<CollectionEventFormProps> = ({
  onSubmit,
  title,
  isSaving,
}) => {
  const { data } = useQuery(fetchInitialDataQuery());

  return (
    <Island>
      <form onSubmit={onSubmit} className={styles.formWrapper}>
        <FormTitle>{title}</FormTitle>
        <FormTextInput name="title" label="Title" />
        <FormImageInput
          name="image"
          label="Image path"
          previewWidth={100}
          previewHeight={100}
        />
        {data && (
          <FormSelect
            label="Collection"
            options={data.options.collections}
            name="collectionId"
          />
        )}
        <div className={styles.dates}>
          <div className={styles.dateGroup}>
            <div className={styles.groupTitle}>Start date</div>
            <div className={styles.inputs}>
              <FormTextInput
                name="startDate.month"
                type="number"
                min={1}
                max={12}
                label="Month"
              />
              <FormTextInput
                name="startDate.date"
                type="number"
                min={1}
                max={31}
                label="Date"
              />
            </div>
          </div>
          <div className={styles.dateGroup}>
            <div className={styles.groupTitle}>End date</div>
            <div className={styles.inputs}>
              <FormTextInput
                name="endDate.month"
                type="number"
                min={1}
                max={12}
                label="Month"
              />
              <FormTextInput
                name="endDate.date"
                type="number"
                min={1}
                max={31}
                label="Date"
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          icon={isSaving ? <LoaderCircle className="spin" /> : <SaveIcon />}
        >
          Save
        </Button>
      </form>
    </Island>
  );
};
