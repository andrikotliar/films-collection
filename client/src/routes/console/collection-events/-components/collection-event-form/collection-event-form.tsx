import { type FormEventHandler } from 'react';
import styles from './collection-event-form.module.css';
import {
  Button,
  FormTextInput,
  FormTitle,
  FormSelect,
  FormTextArea,
  Panel,
  FormCheckbox,
} from '@/components';
import { SaveIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchInitialDataQuery } from '@/common';
import { useFormContext } from 'react-hook-form';
import type { FormValues } from '@/routes/console/collection-events/-types';

type CollectionEventFormProps = {
  onSubmit: FormEventHandler;
  title: string;
  isSaving: boolean;
};

export const CollectionEventForm = ({ onSubmit, title, isSaving }: CollectionEventFormProps) => {
  const { data } = useQuery(fetchInitialDataQuery());
  const { watch } = useFormContext<FormValues>();

  const isOneDayEvent = watch('isOneDayEvent');

  return (
    <Panel>
      <form onSubmit={onSubmit} className={styles.formWrapper}>
        <FormTitle>{title}</FormTitle>
        <FormTextInput name="title" label="Title" />
        {data && (
          <FormSelect label="Collection" options={data.options.collections} name="collectionId" />
        )}
        <FormTextArea name="description" label="Description" />
        <div className={styles.dates}>
          <div className={styles.dateGroup}>
            <div className={styles.groupTitle}>
              <span>Start date</span>
              <FormCheckbox label="One day event" name="isOneDayEvent" type="checkbox" />
            </div>
            <div className={styles.inputs}>
              <FormTextInput name="startMonth" type="number" min={1} max={12} label="Month" />
              <FormTextInput name="startDate" type="number" min={1} max={31} label="Date" />
            </div>
          </div>
          {!isOneDayEvent && (
            <div className={styles.dateGroup}>
              <div className={styles.groupTitle}>End date</div>
              <div className={styles.inputs}>
                <FormTextInput name="endMonth" type="number" min={1} max={12} label="Month" />
                <FormTextInput name="endDate" type="number" min={1} max={31} label="Date" />
              </div>
            </div>
          )}
        </div>
        <FormTextInput
          name="yearFrom"
          label="First event occurrence year"
          placeholder="E.g. 2020"
        />
        <Button type="submit" isLoading={isSaving} icon={<SaveIcon />}>
          Save
        </Button>
      </form>
    </Panel>
  );
};
