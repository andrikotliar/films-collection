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
    <div className="flex flex-wrap items-start gap-7">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3 h-6">
          <FieldLabel>Start Date</FieldLabel>
          <FormCheckbox name="isOneDayEvent" type="checkbox" label="One day event" />
        </div>
        <FormMonthDateSelector name="startDateCode" />
      </div>
      {!isOneDayEvent && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center gap-3 h-6">
            <FieldLabel>End Date</FieldLabel>
          </div>
          <FormMonthDateSelector name="endDateCode" />
        </div>
      )}
    </div>
  );
};
