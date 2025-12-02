import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import { FieldLabel, Form, type CollectionEventMutationPayload } from '~/shared';

export const Dates = () => {
  const { watch } = useFormContext<CollectionEventMutationPayload>();

  const isOneDayEvent = watch('isOneDayEvent');

  return (
    <div className={styles.dates}>
      <div className={styles.column}>
        <div className={styles.date_field}>
          <FieldLabel>Start Date</FieldLabel>
          <Form.Checkbox name="isOneDayEvent" type="checkbox" label="One day event" />
        </div>
        <Form.MonthDateSelector name="startDateCode" />
      </div>
      {!isOneDayEvent && (
        <div className={styles.column}>
          <div className={styles.date_field}>
            <FieldLabel>End Date</FieldLabel>
          </div>
          <Form.MonthDateSelector name="endDateCode" />
        </div>
      )}
    </div>
  );
};
