import styles from './PendingFilmForm.module.css';
import { priorityOptions } from '@/configs';
import {
  Button,
  FormTextInput,
  FormStatusFilterButton,
  FieldLabel,
  FormTitle,
  Island,
  FormSelect,
  FormRatingInput,
} from '@/components';
import { LoaderCircle, SaveIcon } from 'lucide-react';
import { FC, FormEventHandler } from 'react';
import { StatusColor } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { fetchInitialDataQuery } from '@/queries';

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
  const { data } = useQuery(fetchInitialDataQuery());

  return (
    <Island>
      <form onSubmit={onSubmit} className={styles.formWrapper}>
        <FormTitle>{title}</FormTitle>
        <FormTextInput
          name="title"
          label="Title"
          className={styles.titleInput}
        />
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
        {data && (
          <FormSelect
            name="collectionId"
            options={data.options.collections}
            label="Collection"
          />
        )}
        <FormRatingInput name="rating" size={3} label="Rating" />
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
