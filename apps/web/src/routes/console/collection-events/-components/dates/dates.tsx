import styles from './dates.module.css';
import { useFormContext } from 'react-hook-form';
import type z from 'zod';
import type { CollectionEventFormSchema } from '~/routes/console/collection-events/route';
import { FieldLabel, Form } from '~/shared';

export const Dates = () => {
  const { watch } = useFormContext<z.infer<typeof CollectionEventFormSchema>>();

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
