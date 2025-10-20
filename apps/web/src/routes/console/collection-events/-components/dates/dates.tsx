import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import {
  FieldLabel,
  FormCheckbox,
  FormMonthDateSelector,
  type CollectionEventMutationPayload,
} from '~/common';

export const Dates = () => {
  const { watch } = useFormContext<CollectionEventMutationPayload>();

  const isOneDayEvent = watch('isOneDayEvent');

  return (
    <div className={styles.dates}>
      <div className={styles.column}>
        <div className={styles.date_field}>
          <FieldLabel>Start Date</FieldLabel>
          <FormCheckbox name="isOneDayEvent" type="checkbox" label="One day event" />
        </div>
        <FormMonthDateSelector name="startDateCode" />
      </div>
      {!isOneDayEvent && (
        <div className={styles.column}>
          <div className={styles.date_field}>
            <FieldLabel>End Date</FieldLabel>
          </div>
          <FormMonthDateSelector name="endDateCode" />
        </div>
      )}
    </div>
  );
};
