import { type FormEventHandler } from 'react';
import styles from './styles.module.css';
import {
  Button,
  FormTextInput,
  FormTitle,
  FormSelect,
  Panel,
  FormCheckbox,
  FormMonthDateSelector,
  FieldLabel,
  FormAsyncSelect,
} from '@/components';
import { SaveIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchInitialDataQuery } from '@/common';
import { useFormContext } from 'react-hook-form';
import type { FormValues } from '@/routes/console/collection-events/-types';
import { FilmsApi } from '@/api';

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
        <div className={styles.dates}>
          <div className={styles.inputWrapper}>
            <div className={styles.datesHeader}>
              <FieldLabel>Start Date</FieldLabel>
              <FormCheckbox name="isOneDayEvent" type="checkbox" label="One day event" />
            </div>
            <FormMonthDateSelector name="startDate" initialYear={2000} />
          </div>
          {!isOneDayEvent && (
            <div className={styles.inputWrapper}>
              <div className={styles.datesHeader}>
                <FieldLabel>End Date</FieldLabel>
              </div>
              <FormMonthDateSelector name="endDate" initialYear={2000} />
            </div>
          )}
        </div>
        <FormAsyncSelect
          name="titleFilmId"
          optionsLoader={FilmsApi.getOptions}
          label="Title film"
        />
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
